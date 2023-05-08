const fs = require('fs');
const path = require('path');
const util = require('util')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles(){
    try{
        const styles = [];
        const files = await fs.promises.readdir(stylesPath);

        const cssFiles = files.filter((fileName) => 
            path.extname(fileName).toLowerCase() === '.css'
        );

        for(const cssFile of cssFiles){
            const cssFilePath = path.join(stylesPath, cssFile);
            const cssContent = await readFile(cssFilePath, 'utf8');
            styles.push(cssContent);
        }

        await writeFile(bundlePath, styles.join('\n'));

        console.log('Стили замержены');
    }catch (error){
        console.log('Ошибка', error);
    }
}

mergeStyles();