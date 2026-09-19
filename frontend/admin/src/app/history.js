import { createHistory } from '../vendor/appRuntime.js';

const history = createHistory({ basename: '/' });
window.g_history = history;

export default history;
