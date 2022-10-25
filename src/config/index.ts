let dbURL: string;
if (process.env.NODE_ENV == 'production') dbURL = require('./prod');
else dbURL = require('./dev');
export default {
	dbURL,
};
