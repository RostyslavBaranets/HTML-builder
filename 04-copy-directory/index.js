const fs = require('fs').promises;
const path = require('path');

async function copyDir(){
    const filesDir = path.join(__dirname, 'files');
    const filesCopyDir = path.join(__dirname, 'files-copy');

    try{
        await fs.mkdir(filesCopyDir);
    } catch (err){
        if(err.code !== 'EEXIST') throw err;
    }

    const files = await fs.readdir(filesDir);

    for(const file of files){
        const currentFile = path.join(filesDir, file);
        const copyFile = path.join(filesCopyDir, file);
        const stat = await fs.stat(currentFile);

        if(stat.isDirectory()){
            await copyDir(currentFile, copyFile);
        }else{
            await fs.copyFile(currentFile, copyFile);
        }
    }
    console.log('Файлы скопированы');
}

copyDir();