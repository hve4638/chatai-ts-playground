import ChatAI, {
    JSONSchema,
    ChatRole, Chat
} from '@hve/chatai';
import Model from '../model';
import { showChatAIResponse } from '../utils';

async function run(model:Model) {
    const api = new ChatAI();
    const data = await api.request({
        message: [
            ChatRole.System([
                Chat.Text("You are a very busy employee. You are to answer the user's question politely, but very briefly."),
            ]),
            ChatRole.User([
                Chat.Text("Tell me about yourself at length."),
            ]),
        ],
        model: model.model,
        model_detail: model.model_detail,
        secret: {
            api_key: model.api_key
        },
        response_format: new JSONSchema({
            name: 'response_message',
            schema: JSONSchema.Object({
                'output': JSONSchema.String(),
                'user_intent': JSONSchema.String(),
                'user_emotion': JSONSchema.String(),
            }, {
                required: ['output', 'user_intent', 'user_emotion'],
                allow_additional_properties: false
            }),
        }),
        max_tokens: 100
    });
    
    showChatAIResponse(data);
}

export default run;