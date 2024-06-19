const { exec } = require('child_process');
const { copyFileSync } = require('fs');
const { platform } = require('os');

// コンパイルするCプログラムのパスと出力ファイル名
const inputFilePath = './scripts/hello.c';
const outputFileName = 'hello' + (platform() === 'win32' ? '.exe' : '');
const outputFilePath = `./scripts/${outputFileName}`;
const buildOutputFilePath = `./build/${outputFileName}`;

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
