import { useState } from 'react';
import { exec } from 'child_process';
import { platform } from 'os';

const outputFileName = 'hello' + (platform() === 'win32' ? '.exe' : '');
const buildOutputPath = './build/' + outputFileName;

function App() {
  const [helloOut, setHelloOut] = useState("");

  exec(buildOutputPath, (runError, stdout, stderr) => {
    if (runError) {
      console.error(`実行エラー：${runError}`);
      return;
    }
    if (stderr) {
      console.error(`標準出力エラー：${stderr}`);
    }
    
    setHelloOut(stdout);
  })

  return (
    <>標準出力：{ helloOut }</>
  );
}

export default App;
