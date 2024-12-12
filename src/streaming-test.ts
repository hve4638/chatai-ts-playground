import ChatAI, {
    CHAT_ROLE,
    Models,
    ModelNames,
    CHAT_TYPE,
    JSONSchema,
    ChatRole, Chat
} from './chatAI.js';

async function run() {
    const models = [
        [ModelNames.OPENAI_GPT, Models.OPENAI_GPT['gpt-4o'], process.env['API_KEY_GPT']],
        [ModelNames.CLAUDE, Models.CLAUDE['claude-3-5-haiku-20241022'], process.env['APT_KEY_CLAUDE']],
        [ModelNames.GOOGLE_GEMINI, Models.GOOGLE_GEMINI['gemini-exp-1121'], process.env['API_KEY_GEMINI']],
    ] as const;
    const [model, model_detail, apiKey] = models[2];

    const api = new ChatAI();
    const [message, data] = await api.stream({
        message: [
            {
                role: CHAT_ROLE.USER,
                content: [
                    {
                        chatType: CHAT_TYPE.TEXT,
                        text: "Describe yourself very shortly."
                    }
                ]
            },
        ],
        model: model,
        model_detail: model_detail,
        secret: {
            api_key: apiKey
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
    }, {
        
    });

    for await (const msg of message) {
        process.stdout.write(msg);
    }

    const res = await data;
    console.log(res);
}

export default run;