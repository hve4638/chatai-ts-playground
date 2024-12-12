import ChatAI, {
    ChatRole, Chat
} from '@hve/chatai';
import { readFileAsBase64Sync } from '../utils';
import Model from '../model';

async function run(model:Model, file_path:string) {
    const base64 = readFileAsBase64Sync(file_path);
    
    const api = new ChatAI();
    const data = await api.request({
        message: [
            ChatRole.System([
                Chat.Text("You are a very busy employee. You are to answer the user's question politely, but very briefly."),
            ]),
            ChatRole.User([
                Chat.Text("What is in this image?"),
                Chat.Image.Base64(base64),
            ]),
        ],
        model: model.model,
        model_detail: model.model_detail,
        secret: {
            api_key: model.api_key
        },
        max_tokens: 100
    });
    
    const req = data.request;
    const res = data.response;
    if (res.ok) {
        console.log('<Output>');
        console.log(res.content[0]);
        console.log('');
        console.log('');
        console.log('');
        console.log('');
        console.log('<RAW>');
        console.log(data);
    }
    else {
        console.error('<Request failed>');
        console.error('');
        console.error('# REQ');
        console.error(JSON.stringify(req.data, undefined, 4));
        console.error('');
        console.error('# RES');
        console.error(res);
    }
}

export default run;