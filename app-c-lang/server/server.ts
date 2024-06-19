import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 型インポート
import { Request, Response } from 'express';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// C プログラムの実行エンドポイント
app.get('/run-c-program', (req: Request, res: Response) => {
    const outputFileName = 'hello' + (process.platform === 'win32' ? '.exe' : '');
    const buildOutputPath = path.join(__dirname, '../public', outputFileName);

    exec(buildOutputPath, (runError: Error | null, stdout: string, stderr: string) => {
        if (runError) {
            console.error(`実行エラー: ${runError}`);
            return res.status(500).send(`実行エラー: ${runError}`);
        }
        if (stderr) {
            console.error(`標準エラー出力: ${stderr}`);
            return res.status(500).send(`標準エラー出力: ${stderr}`);
        }
        res.send(`出力:\n${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました`);
});
