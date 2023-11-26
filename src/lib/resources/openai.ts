import { OPENAI_API_KEY } from '$env/static/private';
import openai from 'openai';
export default new openai({
	apiKey: OPENAI_API_KEY
});
