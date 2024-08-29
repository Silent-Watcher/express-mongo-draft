import express from 'express';

import morgan from 'morgan';
import connectToMongoDb from './configs/db.config';

const app = express();
const PORT = Number(process.env.PORT || 8080);
const { DB_NAME } = process.env;

app.use(morgan('dev'));

app.get('/health', async (_req, res) => {
	res.send({ msg: 'server is up and running ... ' });
});

connectToMongoDb(DB_NAME as string)
	.then(() => {
		console.log('connected to mongoDB successfully');
		app.listen(PORT, '0.0.0.0', () => {
			console.log(`Server listening at http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error);
	});
