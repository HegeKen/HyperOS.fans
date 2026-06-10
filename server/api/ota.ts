import { defineEventHandler, readBody } from "h3";
import CryptoJS from "crypto-js";

export default defineEventHandler(async (event) => {
	try {
		console.log("=== OTA API 请求开始 ===");
		console.log("请求方法:", event.node.req.method);
		console.log("请求路径:", event.node.req.url);

		// 加密密钥和初始化向量
		const miuiKey = CryptoJS.enc.Utf8.parse("miuiotavalided11");
		const miuiIv = CryptoJS.enc.Utf8.parse("0102030405060708");

		// 将字符串转换为ASCII字节数组
		function stringToAsciiBytes(str: string): Uint8Array {
			const bytes = new Uint8Array(str.length);
			for (let i = 0; i < str.length; i++) {
				const charCode = str.charCodeAt(i);
				if (charCode > 127) {
					throw new Error(
						`字符 '${str[i]}' (ASCII码: ${charCode}) 超出ASCII范围`,
					);
				}
				bytes[i] = charCode;
			}
			return bytes;
		}

		// 将Uint8Array转换为CryptoJS的WordArray
		function uint8ArrayToWordArray(bytes: Uint8Array): CryptoJS.lib.WordArray {
			const length = bytes.length;
			const words: number[] = [];
			for (let i = 0; i < length; i += 4) {
				const b0 = bytes[i] ?? 0;
				const b1 = bytes[i + 1] ?? 0;
				const b2 = bytes[i + 2] ?? 0;
				const b3 = bytes[i + 3] ?? 0;
				words.push((b0 << 24) | (b1 << 16) | (b2 << 8) | b3);
			}
			return CryptoJS.lib.WordArray.create(words, length);
		}

		// 加密函数（匹配Python的miui_encrypt）
		function miuiEncrypt(jsonRequest: any): string {
			console.log("=== 开始加密 ===");

			// JSON序列化
			let jsonString = JSON.stringify(jsonRequest);
			console.log("JSON字符串(原始):", jsonString);

			// 将双引号替换为单引号（模拟Python的str(dict)格式）
			jsonString = jsonString.replace(/"/g, "'");
			console.log("JSON字符串(单引号):", jsonString);

			// ASCII编码
			const asciiBytes = stringToAsciiBytes(jsonString);
			console.log("ASCII字节数组长度:", asciiBytes.length);

			// PKCS7填充
			const blockSize = 16;
			const paddingLength = blockSize - (asciiBytes.length % blockSize);
			const paddedBytes = new Uint8Array(asciiBytes.length + paddingLength);
			paddedBytes.set(asciiBytes);
			for (let i = 0; i < paddingLength; i++) {
				paddedBytes[asciiBytes.length + i] = paddingLength;
			}
			console.log("填充后长度:", paddedBytes.length);

			// 转换为WordArray
			const wordArray = uint8ArrayToWordArray(paddedBytes);

			// AES-CBC加密
			const encrypted = CryptoJS.AES.encrypt(wordArray, miuiKey, {
				iv: miuiIv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.NoPadding,
			});

			const encryptedBase64 = encrypted.toString();
			// 与Python一致，额外将/替换为%2F
			const encryptedUrlEncoded = encodeURIComponent(encryptedBase64).replace(
				/\//g,
				"%2F",
			);

			console.log("加密结果:", encryptedUrlEncoded);
			console.log("=== 加密完成 ===");

			return encryptedUrlEncoded;
		}

		// 将单引号格式转换为JSON格式（与加密时的双引号转单引号对应）
		function convertSingleQuoteToJson(plaintext: string): string {
			// 使用状态机处理字符串内的单引号
			let result = "";
			let inString = false;
			let escape = false;

			for (let i = 0; i < plaintext.length; i++) {
				const char = plaintext[i];

				if (escape) {
					result += char;
					escape = false;
					continue;
				}

				if (char === "\\") {
					result += char;
					escape = true;
					continue;
				}

				if (char === "'" && !inString) {
					// 字符串开始
					result += '"';
					inString = true;
				} else if (char === "'" && inString) {
					// 字符串结束
					result += '"';
					inString = false;
				} else {
					result += char;
				}
			}

			// 处理Python布尔值和None
			result = result.replace(/\bTrue\b/g, "true");
			result = result.replace(/\bFalse\b/g, "false");
			result = result.replace(/\bNone\b/g, "null");

			return result;
		}

		// 解密函数（匹配客户端testEncrypt的反向操作）
		function decryptResponse(encryptedText: string): any {
			console.log("=== 开始解密 ===");
			console.log("解密响应(原始):", encryptedText);
			try {
				// URL解码（与加密时的URL编码对应）
				const decodedInput = decodeURIComponent(encryptedText);
				console.log("URL解码后:", decodedInput);

				// AES解密
				const bytes = CryptoJS.AES.decrypt(decodedInput, miuiKey, {
					iv: miuiIv,
					mode: CryptoJS.mode.CBC,
					padding: CryptoJS.pad.Pkcs7,
				});

				let plaintext = bytes.toString(CryptoJS.enc.Utf8).trim();
				console.log("解密后的原始文本:", plaintext);

				// 处理可能的垃圾数据，找到最后一个 }
				const pos = plaintext.lastIndexOf("}");
				if (pos !== -1) {
					plaintext = plaintext.substring(0, pos + 1);
				}
				console.log("清理后的文本:", plaintext);

				// 优先尝试直接解析（MIUI响应是标准JSON格式，双引号）
				try {
					const result = JSON.parse(plaintext);
					console.log("JSON解析结果:", result);
					console.log("=== 解密完成 ===");
					return result;
				} catch {
					// 如果直接解析失败，再尝试将单引号转换为双引号（兼容Python str(dict)格式）
					console.log("直接解析失败，尝试单引号转换...");
					const jsonText = convertSingleQuoteToJson(plaintext);
					console.log("转换为JSON格式:", jsonText);
					const result = JSON.parse(jsonText);
					console.log("JSON解析结果:", result);
					console.log("=== 解密完成 ===");
					return result;
				}
			} catch (e) {
				console.error("解密失败:", e);
				return null;
			}
		}

		const body = await readBody(event);

		// 验证必要参数
		if (!body.data || !body.region) {
			return {
				success: false,
				message: "缺少必要参数",
				data: null,
			};
		}

		// 如果body.data是对象，先进行加密
		let encryptedData = body.data;
		if (typeof body.data === "object") {
			console.log("检测到数据为对象，进行加密...");
			encryptedData = miuiEncrypt(body.data);
		}

		// 匹配 Python: 始终使用 update.miui.com
		const url = "https://update.miui.com/updates/miotaV3.php";
		const host = "update.miui.com";

		// 构建请求体：q=加密数据&s=1&t=
		const requestBody = `q=${encryptedData}&s=1&t=`;

		// 发送请求到 MIUI OTA API
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"user-agent":
					"Dalvik/2.1.0 (Linux; U; Android 13; MI 9 Build/TKQ1.220829.002)",
				Connection: "Keep-Alive",
				"Content-Type": "application/x-www-form-urlencoded",
				"Cache-Control": "no-cache",
				Host: host,
				"Accept-Encoding": "gzip",
				"Content-Length": requestBody.length.toString(),
				Cookie: "serviceToken=;",
			},
			body: requestBody,
		});

		if (!response.ok) {
			return {
				success: false,
				message: "OTA API 请求失败: " + response.status,
				data: null,
			};
		}

		const encryptedResponse = await response.text();

		// 匹配 Python: 用 "q=" 分割取第一部分（encrypted payload），第二部分是 "q=..." 后缀
		const parts = encryptedResponse.split("q=");
		const encryptedPayload = parts[0] || encryptedResponse;

		// 如果 payload 包含 'code'，说明请求参数有误（JSON 错误响应）
		if (encryptedPayload.includes("code")) {
			return {
				success: false,
				message: "请求参数无效",
				data: encryptedResponse,
			};
		}

		// 解密响应（Python: miui_decrypt(response.text.split("q=")[0])）
		const decrypted = decryptResponse(encryptedPayload);

		if (!decrypted) {
			return {
				success: false,
				message: "无法解密响应",
				data: encryptedResponse,
			};
		}

		return {
			success: true,
			message: "获取成功",
			data: decrypted,
		};
	} catch (e: any) {
		console.error("OTA 请求错误:", e);
		return {
			success: false,
			message: e.message || "服务器内部错误",
			data: null,
		};
	}
});
