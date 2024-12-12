import * as fs from 'fs';
import runRequest from './request-test.js';
import runStreaming from './streaming-test.js';
import runImage from './image-test.js';

//fs.readFileSync('C:\\Users\\hve46\\Desktop\\test.txt', 'utf8');

function readFileAsBase64Sync(filePath) {
  const data = fs.readFileSync(filePath);
  return data.toString('base64');
}

// 사용 예시
//const file_path = 'C:\\Users\\hve46\\Desktop\\mac.png'
//const file_path = 'C:\\Users\\hve46\\Desktop\\Sprite-0002.webp'
//const file_path = 'C:\\Users\\hve46\\Desktop\\clipboard_20241209_063938_464.png'
//const image_url = readFileAsBase64Sync(file_path);

runRequest();
//runStreaming();
//runImage(image_url);
