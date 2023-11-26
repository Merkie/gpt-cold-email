import { CRED_SECRET } from '$env/static/private';
import cryptr from 'cryptr';
export default new cryptr(CRED_SECRET);
