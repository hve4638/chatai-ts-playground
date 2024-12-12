import ChatAI, {
    ChatRole, Chat
} from '@hve/chatai';
import Model from '../model';
import { readFileAsBase64Sync, showChatAIResponse } from '../utils';

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
    
    showChatAIResponse(data);
}

export default run;