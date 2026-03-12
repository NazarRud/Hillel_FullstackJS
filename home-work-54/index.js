import 'dotenv/config';
import {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
} from './main.js';


console.log("---Завдання - #1---");
console.log(isDebugMode());

console.log("---Завдання - #2---");
const base64Encoded = encodeToBase64('john@email.com', '123', 'extraData');
console.log('Base64 Encoded:', base64Encoded);

const hexEncoded = encodeToHex('john@email.com', '123', 'extraData');
console.log('Hex Encoded:', hexEncoded);

const base64Decoded = decodeFromBase64(base64Encoded);
console.log('Base64 Decoded:', base64Decoded);

const hexDecoded = decodeFromHex(hexEncoded);
console.log('Hex Decoded:', hexDecoded);

console.log("---Завдання - #3---");
const safeBase64Decoded = safeDecodeFromBase64(base64Encoded);
console.log('Safe Base64 Decoded:', safeBase64Decoded);

const safeHexDecoded = safeDecodeFromHex(hexEncoded);
console.log('Safe Hex Decoded:', safeHexDecoded);