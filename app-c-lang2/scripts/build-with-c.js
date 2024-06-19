const { exec } = require('child_process');
const { copyFileSync } = require('fs');
const { platform } = require('os');

// コンパイルするCプログラムのパスと出力ファイル名
const scriptsDirName = "scripts";
const inputFilePath = `./${scriptsDirName}/hello.c`;
const outputFileName = 'hello' + (platform() === 'win32' ? '.exe' : '');
const outputFilePath = `./${scriptsDirName}/${outputFileName}`;
const buildOutputFilePath = `./server/${outputFileName}`;

// Cプログラムをコンパイル
exec(`gcc ${inputFilePath} -o ${outputFilePath}`, (compileError) => {
    if (compileError) {
        console.error(`コンパイルエラー: ${compileError}`);
        process.exit(1);
    }
    console.log('Cプログラムのコンパイル成功');

    // コンパイルしたプログラムをビルドディレクトリにコピー
    copyFileSync(outputFilePath, buildOutputFilePath);
    console.log('ビルドディレクトリにhelloをコピー');
});
