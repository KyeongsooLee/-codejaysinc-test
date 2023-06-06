import express from 'express';
import { connectMongoDB, connectPostgres } from './database';
import routes from './routes/index';

const app = express();
const cors = require('cors');
app.use(express.static('./src'))
app.use(express.json());
app.use(cors({ origin: 'https://codejaysinc-test-557jixjsc-kyeongsoolee.vercel.app', credentials: true }));

app.use('/api', routes.authRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  connectMongoDB();
  connectPostgres();
  console.log(`Server is running on ${port}`);
});

export default server;