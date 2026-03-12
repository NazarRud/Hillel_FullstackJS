console.log('#54. JavaScript homework example file');

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "isDebugMode"
 *
 * Задача:
 * Розробити функцію, яка визначає чи знаходиться додаток у режимі відладки, виходячи зі значення змінної середовища `NODE_ENV`.
 * Функція повинна аналізувати стан середовища і відповідно повертати булеве значення, яке індикує режим відладки.
 * Додатково функція забезпечує логування процесу перевірки для допомоги у розумінні поточного стану виконання та середовища.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - Не потребує вхідних параметрів.
 *
 * 2. Визначення режиму відладки:
 *  - Функція `isDebugMode()` перевіряє значення змінної середовища `NODE_ENV`.
 *  - Повертає `true`, якщо `NODE_ENV` дорівнює 'development'.
 *  - Повертає `false`, якщо `NODE_ENV` має будь-яке інше значення або не встановлено.
 *
 * 3. Логування:
 *  - Логування поверненого значення у консоль перед завершенням функції.
 *  - Опційно, логування поточного значення `NODE_ENV` для кращого розуміння стану середовища.
 *
 * Технічні вимоги:
 * - Строга перевірка рівності використовуючи оператор `===`.
 * - Запис функції має бути виконаний з використанням стрілкової функції для підтримки сучасних стандартів ES6+.
 * - Код має бути написаний чисто і чітко, з урахуванням потенційних розширень для додаткових перевірок середовища.
 *
 */

const isDebugMode = () => {
  console.log(`Значення NODE_ENV: ${process.env.NODE_ENV}`);
  const isDebug = process.env.NODE_ENV === 'development';
  console.log('Debug mode:', isDebug);

  return isDebug
}

/*
 *
 * #2
 *
 * Технічне завдання для розробки функцій "encodeToBase64", "encodeToHex", "decodeFromBase64", і "decodeFromHex"
 *
 * Задача:
 * Розробити набір функцій, які забезпечують кодування та декодування рядків.
 * Функції повинні дозволяти об'єднувати вхідні параметри у рядок з роздільником та кодувати або декодувати його у формати Base64 і Hex.
 * Ці функції мають бути гнучкими для обробки довільної кількості рядків та забезпечувати чітке логування процесів кодування та декодування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - Довільна кількість рядків як параметри функцій.
 *
 * 2. Операції кодування:
 *  - Використання функції `encodeToBase64(...args)`: об'єднання всіх аргументів у рядок з роздільником `:` і кодування його в формат base64.
 *  - Використання функції `encodeToHex(...args)`: об'єднання всіх аргументів у рядок з роздільником `:` і кодування його в шістнадцятковий формат.
 *
 * 3. Операції декодування:
 *  - Використання функції `decodeFromBase64(base64String)`: декодування рядка з формату base64 у звичайний рядок.
 *  - Використання функції `decodeFromHex(hexString)`: декодування рядка з шістнадцяткового формату у звичайний рядок.
 *
 * 4. Логування:
 *  - Логування отриманих даних у консоль при виклику кожної з функцій.
 *  - Логування можливих помилок в процесі кодування/декодування.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема rest-параметрів для збору аргументів.
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
 */

// Функції для кодування даних з довільною кількістю аргументів
function encodeToBase64(...args) {
  try {
    const joinedString = args.join(":");
    const encodedString = Buffer.from(joinedString).toString("base64");

    return encodedString;
  } catch (error) {
    console.error("Base64 encode error:", error.message);
    throw error;
  }
}

function encodeToHex(...args) {
  try {
    const joinedString = args.join(":");
    const encodedString = Buffer.from(joinedString).toString("hex");

    return encodedString;
  } catch (error) {
    console.error("Hex encode error:", error.message);
    throw error;
  }
}

// Функції для декодування даних
function decodeFromBase64(base64String) {
  try {
    return Buffer.from(base64String, "base64").toString("utf-8");
  } catch (error) {
    console.error("Base64 decode error:", error.message);
    throw error;
  }
}

function decodeFromHex(hexString) {
  try {
    return Buffer.from(hexString, "hex").toString("utf-8");
  } catch (error) {
    console.error("Hex decode error:", error.message);
    throw error;
  }
}

// ! Приклад використання:
// const base64Encoded = encodeToBase64('john@email.com', '123', 'extraData')
// console.log('Base64 Encoded:', base64Encoded)
//
// const hexEncoded = encodeToHex('john@email.com', '123', 'extraData')
// console.log('Hex Encoded:', hexEncoded)
//
// const base64Decoded = decodeFromBase64(base64Encoded)
// console.log('Base64 Decoded:', base64Decoded)
//
// const hexDecoded = decodeFromHex(hexEncoded)
// console.log('Hex Decoded:', hexDecoded)

/*
 *
 * #3
 *
 * Технічне завдання для розробки функцій "safeDecodeFromBase64" та "safeDecodeFromHex"
 *
 * Задача:
 * Розробити функції для безпечного декодування даних з форматів base64 та hex.
 * Функції повинні перевіряти валідність вхідних рядків і забезпечувати відповідні повідомлення про помилки та логування успішного виконання.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `base64String` та `hexString`: рядки, які мають бути декодовані відповідно з форматів base64 та hex.
 *
 * 2. Операції декодування з перевіркою:
 *  - Використання функції `safeDecodeFromBase64(base64String)`: перевірка на валідність рядка у форматі base64 перед декодуванням, повернення декодованого рядка або помилки при невалідних даних.
 *  - Використання функції `safeDecodeFromHex(hexString)`: перевірка на валідність рядка у шістнадцятковому форматі перед декодуванням, повернення декодованого рядка або помилки при невалідних даних.
 *
 * 3. Обробка помилок:
 *  - Якщо декодування не вдається через невалідність вхідних даних, функції викидають помилку з інформативним повідомленням (`Invalid base64 string` або `Invalid hex string`).
 *  - Забезпечення прозорого інформування користувача про помилку при її виникненні.
 *
 * 4. Логування:
 *  - Логування декодованих даних у консоль при успішному декодуванні.
 *  - Логування помилок у консоль при їх виникненні.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема регулярних виразів для перевірки формату вхідних даних.
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
 */

function safeDecodeFromBase64(base64String) {
  try {
    if (typeof base64String !== "string" || base64String.length === 0) {
      throw new Error("Invalid base64 string");
    }

    const normalizedBase64 = base64String.trim();

    // Регулярку для перевірки знайшов в інтернеті
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    if (!base64Regex.test(normalizedBase64)) {
      throw new Error("Invalid base64 string");
    }

    const decodedBuffer = Buffer.from(normalizedBase64, "base64");
    const decodedString = decodedBuffer.toString("utf8");

    return decodedString;
  } catch (error) {
    console.error("Base64 decode error:", error.message);
    throw error;
  }
}

function safeDecodeFromHex(hexString) {
  try {
    if (typeof hexString !== "string" || hexString.length === 0) {
      throw new Error("Invalid hex string");
    }

    const normalizedHex = hexString.trim();

    // Регулярку для перевірки знайшов в інтернеті
    const hexRegex = /^(?:[0-9a-fA-F]{2})+$/;

    if (!hexRegex.test(normalizedHex)) {
      throw new Error("Invalid hex string");
    }

    const decodedBuffer = Buffer.from(normalizedHex, "hex");
    const decodedString = decodedBuffer.toString("utf8");

    return decodedString;
  } catch (error) {
    console.error("Hex decode error:", error.message);
    throw error;
  }
}

// ! Приклад використання:
// const safeBase64Decoded = safeDecodeFromBase64(base64Encoded)
// console.log('Safe Base64 Decoded:', safeBase64Decoded)
//
// const safeHexDecoded = safeDecodeFromHex(hexEncoded)
// console.log('Safe Hex Decoded:', safeHexDecoded)

export {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
};
