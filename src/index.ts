import { Models, ModelDetails, ChatAIResponse } from '@hve/chatai';
import Model from './model.js';
import requestTest from './cases/request-test.js';
import jsonTest from './cases/json-test.js';
import streamTest from './cases/stream-test.js';
import imageTest from './cases/image-test.js';
import fileTest from './cases/file-test.js';

const models = {
    'claude' : new Model(Models.CLAUDE, ModelDetails.CLAUDE['claude-3-5-sonnet-20240620'], process.env['API_KEY_CLAUDE']),
    'gemini' : new Model(Models.GOOGLE_GEMINI, ModelDetails.GOOGLE_GEMINI['gemini-exp-1121'], process.env['API_KEY_GEMINI']),
    'gpt' : new Model(Models.OPENAI_GPT, ModelDetails.OPENAI_GPT['gpt-4o'], process.env['API_KEY_GPT']),
} as const;

const image_path = './data/image.png'

const model = models['gpt'];
// requestTest(model);
// jsonTest(model);
// streamTest(model);
// imageTest(model, image_path);
//fileTest(model, file_path);
