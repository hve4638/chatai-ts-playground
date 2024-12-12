import ChatAI, {
    Models,
    JSONSchema,
    ChatRole, Chat
} from '@hve/chatai';

class Model {
    model: Models;
    model_detail: string;
    api_key?: string;

    constructor(model:Models, model_detail:string, api_key:string|undefined) {
        this.model = model;
        this.model_detail = model_detail;
        this.api_key = api_key;
    }
}


export default Model;