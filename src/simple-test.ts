import ChatAI, {
    CHAT_ROLE,
    Models,
    ModelNames,
    CHAT_TYPE,
    JSONSchema,
    ChatRole, Chat
} from './chatAI.js';


async function run() {
    const chatAI = new ChatAI();
    const data = await chatAI.request({
        message: [
            ChatRole.System([
                Chat.Text("You are a very busy employee. You are to answer the user's question politely, but very briefly."),
            ]),
            ChatRole.User([
                Chat.Text("Tell me about yourself at length."),
            ]),
        ],
        model: ModelNames.OPENAI_GPT,
        model_detail: 'gpt-4o',
        secret: {
            api_key: process.env['API_KEY_GPT']
        },
        max_tokens: 100
    });
    
    const res = data.response;
    if (res.ok) {
        console.log(res.content[0]);
    }
}

export default run;