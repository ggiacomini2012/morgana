import * as dotenv from 'dotenv';
import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

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
