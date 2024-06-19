const express = require("express")
const path = require("path");
const { exec } = require("child_process");


const app = express()
const port = 3000

app.get('/', (req, res) => {
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
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
