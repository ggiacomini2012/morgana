import * as dotenv from 'dotenv';
import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import axios from 'axios';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', routes.user);
app.use('/agenda', routes.agenda);

app.get('/', (req, res) => res.send('Morgana Api. Routes: /user and /agenda...'));

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});

console.log(new Date("2023-03-14").getDay());


const secound = 1000;
const minute = secound * 60;
// const hour = minute * 60;
setInterval(async () => {
  await axios.get(process.env.VITE_APP_API_URL || `http://localhost:${port}`);
}, minute * 5);
