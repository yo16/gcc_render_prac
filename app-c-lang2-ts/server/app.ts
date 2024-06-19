import express, { Request, Response } from "express";
import path from "path";
import { exec } from "child_process";

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    const outputFileName = 'hello' + (process.platform === 'win32' ? '.exe' : '');
    const buildOutputPath = path.join(__dirname, outputFileName);

    exec(buildOutputPath, (runError, stdout, stderr) => {
        if (runError) {
            console.error(`実行エラー: ${runError}`);
            return res.status(500).send(`実行エラー: ${runError}`);
        }
        if (stderr) {
            console.error(`標準エラー出力: ${stderr}`);
            return res.status(500).send(`標準エラー出力: ${stderr}`);
        }
        res.send(stdout);
    });
    
    //res.send("hello!");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
