import { 
  writeFileAsync, 
  readFileAsync, 
  deleteFileAsync 
} from "./main.js";

async function main(): Promise<void> {
    console.log("---Завдання - #1---");
    await writeFileAsync("example.txt", "Привіт, це тестовий файл!");

    console.log("---Завдання - #2---");
    await readFileAsync("example.txt");

    console.log("---Завдання - #3---");
    await writeFileAsync("example.txt", "Привіт, це тестовий файл!");
    await deleteFileAsync("example.txt");
}

main().catch((error) => {
  console.log('Помилка:', error);
});
