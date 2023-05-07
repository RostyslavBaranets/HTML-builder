const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Введите текст. Для выхода введите "exit" или нажмите ctrl + c:');

stdin.on('data', data => {
    const input = data.toString().trim();
    if(input === 'exit'){
        process.exit();
    }
    writeStream.write(`${input}\n`)
})

process.on('SIGINT', () => {
    process.exit();
})

process.on('exit', () => console.log('Удачи!'));