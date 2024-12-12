import * as fs from 'node:fs';
import { ChatAIResponse } from '@hve/chatai';

export function readFileAsBase64Sync(filePath) {
    const data = fs.readFileSync(filePath);
    return data.toString('base64');
}

export function showChatAIResponse(res:ChatAIResponse) {
    if (res.response.ok) {
        console.log('<Request Success>');
        console.log('');
        console.log(res.response.content[0]);
        console.log('');
    }
    else {
        console.error('<Request failed>');
        console.log('');
        console.error(JSON.stringify(res, undefined, 4));
        console.log('');
    }
}