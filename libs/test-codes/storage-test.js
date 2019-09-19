let Storage = require("../Storage");

let testText = "java"

let uniBuffer = Storage._toBufferFromUnicode(testText);
let hexCode = uniBuffer.toString("hex");
console.log(hexCode);

let hexBuffer = Storage._toBufferFromHex(hexCode);
let text = hexBuffer.toString("utf8");
console.log(text);

console.log(testText == text);
