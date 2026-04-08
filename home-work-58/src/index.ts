import { randomBytes } from "node:crypto";
import { generateHash, generatePasswordHash, verifyPassword } from "./main.js";

function main(): void {
    console.log("---Завдання - #1---");
    console.log(generateHash('Hello, World!'));

    console.log("---Завдання - #2---");
    const password: string = "superSecret123";
    const salt: string = randomBytes(16).toString('hex');
    const hash: string = generatePasswordHash(password, salt);
    console.log("Hash: ", hash);

    console.log("---Завдання - #3---");
    const inputPassword: string = "superSecret123";
    const isCorrect: boolean = verifyPassword(inputPassword, hash, salt);
    console.log(isCorrect ? 'Пароль вірний.' : 'Пароль невірний.');
}

main();