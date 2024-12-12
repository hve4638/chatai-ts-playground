import ChatAI, {
    ChatRole, Chat
} from '@hve/chatai';
import Model from '../model';
import { showChatAIResponse } from '../utils';


async function run(model:Model) {
    const api = new ChatAI();
    const [message, data] = await api.stream({
        message: [
            ChatRole.User([
                Chat.Text('Describe yourself very shortly.')
            ]),
        ],
        model: model.model,
        model_detail: model.model_detail,
        secret: {
            api_key: model.api_key
        },
        max_tokens: 100
    }, {
        
    });

    for await (const msg of message) {
        process.stdout.write(msg);
    }
    console.log('');

    showChatAIResponse(await data);
}

export default run;