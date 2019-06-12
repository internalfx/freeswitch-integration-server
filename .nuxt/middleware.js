const middleware = {}

middleware['noLogin'] = require('../client/middleware/noLogin.js');
middleware['noLogin'] = middleware['noLogin'].default || middleware['noLogin']

export default middleware
