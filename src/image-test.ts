import ChatAI, {
    CHAT_ROLE,
    Models,
    ModelNames,
    CHAT_TYPE,
    JSONSchema,
    ChatRole, Chat
} from './chatAI.js';


async function run(image_url) {
    const models = [
        [ModelNames.OPENAI_GPT, Models.OPENAI_GPT['gpt-4o'], process.env['API_KEY_GPT']],
        [ModelNames.CLAUDE, Models.CLAUDE['claude-3-5-sonnet-20240620'], process.env['APT_KEY_CLAUDE']],
        [ModelNames.GOOGLE_GEMINI, Models.GOOGLE_GEMINI['gemini-exp-1121'], process.env['API_KEY_GEMINI']],
    ] as const;
    const [model, model_detail, apiKey] = models[1];

    const api = new ChatAI();
    const data = await api.request({
        message: [
            ChatRole.System([
                Chat.Text("You are a very busy employee. You are to answer the user's question politely, but very briefly."),
            ]),
            ChatRole.User([
                Chat.Text("What is in this image?"),
                Chat.Image.Base64(image_url),
            ]),
        ],
        model: model,
        model_detail: model_detail,
        secret: {
            api_key: apiKey
        },
        // response_format: new JSONSchema({
        //     name: 'response_message',
        //     schema: JSONSchema.Object({
        //         'output': JSONSchema.String(),
        //         'user_intent': JSONSchema.String(),
        //         'user_emotion': JSONSchema.String(),
        //     }, {
        //         required: ['output', 'user_intent', 'user_emotion'],
        //         allow_additional_properties: false
        //     }),
        // }),
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