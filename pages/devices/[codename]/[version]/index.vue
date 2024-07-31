<template>
  {{ contactForm().excute }}
  <!-- {{ MiDecrypt(contactForm()) }} -->
</template>


<script>
import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
      plaintext: '',
      ciphertext: '',
      decryptedText: '',
    };
  }
}
</script>

<script setup>
//http://localhost:3000/zh/devices/venus/OS1.0.2.0.UNACNXM?code=aurora&and=14.0&rerion=CN
const route = useRoute();
const { locale } = useI18n();
const miui_key = CryptoJS.enc.Utf8.parse("miuiotavalided11");
const miui_iv = CryptoJS.enc.Utf8.parse('0102030405060708');
const check_url = "https://update.miui.com/updates/miotaV3.php";


let HyperOSForm = {
  "obv": "OS1.0",
  "channel": "",
  "sys": "0",
  "bv": "816",
  "id": "",
  "sn": "0x0000043b716a25f1",
  "a": "0",
  "b": "F",
  "c": "14",
  "unlock": "1",
  "d": "marble",
  "lockZoneChannel": "normal",
  "f": "1",
  "ov": "OS1.0.5.0.UMRCNXM",
  "g": "9b65722a06722e8d8dffa35a9fd58586",
  "i": "14db85f96df2efc324323fa7679f0d847ff53f3bff7179ea0c778ce5d980bc03",
  "i2": "2cd7c24f21e33b236fc63f26d044227b96d8b39a80400654f88182322688793b",
  "isR": "0",
  "l": "zh_CN",
  "n": "ct",
  "p": "marble",
  "pb": "Redmi",
  "r": "CN",
  "v": "MIUI-V816.0.5.0.UMRCNXM",
  "sdk": "34",
  "pn": "marble",
  "options": {
    "zone": 1,
    "hashId": "dae7d50f696d7403",
    "ab": "1",
    "previewPlan": "0",
    "sv": 3,
    "av": "8.5.2",
    "cv": ""
  }
}
function MiEncrypt(reqdata) {
  const cipher = CryptoJS.AES.encrypt(JSON.stringify(reqdata), miui_key, {
    iv: miui_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return "q=" + encodeURIComponent(cipher.toString().replace("/", "%2F")) + "&s=1&t=";
}
function MiDecrypt(getdata) {
  const bytes = CryptoJS.AES.decrypt(getdata, miui_key, {
    iv: miui_iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const plaintext = bytes.toString(CryptoJS.enc.Utf8).trim();
  const pos = plaintext.lastIndexOf("}");
  if (pos !== -1) {
    return JSON.parse(plaintext.substring(0, pos + 1));
  } else {
    return JSON.parse(plaintext);
  }
}
async function contactForm() {
  // HyperOSForm["p"] = route.query.code
  // HyperOSForm["pn"] = route.query.code
  // HyperOSForm["d"] = route.query.code
  // HyperOSForm["v"] = HyperOSForm["v"] + route.params.version.replace("OS1", "V816")
  // HyperOSForm["r"] = route.query.region
  const { hello } = await $fetch(check_url, {
    method: 'POST',
    headers : {
      "user-agent": "Dalvik/2.1.0 (Linux; U; Android 13; MI 9 Build/TKQ1.220829.002)",
      "Connection": "Keep-Alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      "Host": "update.miui.com",
      "Accept-Encoding": "gzip",
      "Content-Length": "795",
      "Cookie": "serviceToken=;"
    },
    body: MiEncrypt(HyperOSForm)
  })
  return { hello }
}
</script>