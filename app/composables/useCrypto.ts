import CryptoJS from "crypto-js";

const miuiKey = CryptoJS.enc.Utf8.parse("miuiotavalided11");
const miuiIv = CryptoJS.enc.Utf8.parse("0102030405060708");

const sdkMap: Record<string, string> = {
	"16": "35",
	"15": "35",
	"14": "34",
	"13": "33",
	"12": "32",
	"11": "30",
	"10": "29",
	"9": "28",
};

function stringToAsciiBytes(str: string): Uint8Array {
	const bytes = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++) {
		const charCode = str.charCodeAt(i);
		if (charCode > 127) {
			throw new Error(
				`Character '${str[i]}' (ASCII: ${charCode}) out of ASCII range`,
			);
		}
		bytes[i] = charCode;
	}
	return bytes;
}

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

function convertSingleQuoteToJson(plaintext: string): string {
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
			result += '"';
			inString = true;
		} else if (char === "'" && inString) {
			result += '"';
			inString = false;
		} else {
			result += char;
		}
	}

	result = result.replace(/\bTrue\b/g, "true");
	result = result.replace(/\bFalse\b/g, "false");
	result = result.replace(/\bNone\b/g, "null");

	return result;
}

/**
 * Encrypt a JSON-serializable object using MIUI AES-CBC encryption
 */
export function miEncrypt(jsonRequest: Record<string, any>): string {
	const jsonString = JSON.stringify(jsonRequest);

	const asciiBytes = stringToAsciiBytes(jsonString);

	const blockSize = 16;
	const paddingLength = blockSize - (asciiBytes.length % blockSize);
	const paddedBytes = new Uint8Array(asciiBytes.length + paddingLength);
	paddedBytes.set(asciiBytes);
	for (let i = 0; i < paddingLength; i++) {
		paddedBytes[asciiBytes.length + i] = paddingLength;
	}

	const wordArray = uint8ArrayToWordArray(paddedBytes);

	const encrypted = CryptoJS.AES.encrypt(wordArray, miuiKey, {
		iv: miuiIv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.NoPadding,
	});

	const encryptedBase64 = encrypted.toString();
	const encryptedUrlEncoded = encodeURIComponent(encryptedBase64).replace(
		/\//g,
		"%2F",
	);

	return encryptedUrlEncoded;
}

/**
 * Decrypt a MIUI AES-CBC encrypted response string
 */
export function decryptResponse(encryptedText: string): any {
	try {
		const decodedInput = decodeURIComponent(encryptedText);

		const bytes = CryptoJS.AES.decrypt(decodedInput, miuiKey, {
			iv: miuiIv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});

		let plaintext = bytes.toString(CryptoJS.enc.Utf8).trim();

		const pos = plaintext.lastIndexOf("}");
		if (pos !== -1) {
			plaintext = plaintext.substring(0, pos + 1);
		}

		const jsonText = convertSingleQuoteToJson(plaintext);
		return JSON.parse(jsonText);
	} catch (e) {
		console.error("Decryption failed:", e);
		return null;
	}
}

/**
 * Build a HyperOS OTA form/request object
 */
export function buildHyperOSForm(
	code: string,
	device: string,
	version: string,
	region: string,
	android: string,
	b: string,
	zone: string | number = 1,
): any {
	const pb = "Redmi";

	const isCn = region.toLowerCase() === "cn";
	let pn = code;
	if (!isCn && code !== device + "_global") {
		pn = code.split("_global")[0] || code;
	}

	let v = version;
	if (version.includes("OS1")) {
		v = "MIUI-" + version.replace("OS1", "V816");
	}

	return {
		obv: "OS1.0",
		channel: "",
		sys: "0",
		bv: "816",
		id: "",
		sn: "0x0000043b716a25f1",
		a: "0",
		b: b,
		c: android.replace(".0", ""),
		unlock: "0",
		d: code,
		lockZoneChannel: "normal",
		f: "1",
		ov: "OS1.0.2.0.UMRCNXM",
		g: "9b65722a06722e8d8dffa35a9fd58586",
		i: "14db85f96df2efc324323fa7679f0d847ff53f3bff7179ea0c778ce5d980bc03",
		i2: "2cd7c24f21e33b236fc63f26d044227b96d8b39a80400654f88182322688793b",
		isR: "0",
		l: "zh_CN",
		n: "",
		p: code,
		pb: pb,
		r: isCn ? "CN" : "GL",
		v: v,
		sdk: (sdkMap[android] ?? "34") as string,
		pn: pn,
		options: {
			zone: String(zone),
			hashId: "dae7d50f696d7403",
			ab: "1",
			previewPlan: "0",
			sv: 3,
			av: "8.8.8",
			cv: version,
		},
	};
}
