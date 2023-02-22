import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// import controller from './controllers';
// import middlewares from './middlewares';

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const noLength = (word: string) => word.length === 0;
    if( noLength(name) || noLength(password) || noLength(email) ) throw new Error('Check if you are passing the name, email, and password properly.');
    
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.json({ message: `User with name: ${name} was created!` });
  } catch(error) {
    const { name } = req.body;
     res.status(333).json({message: error.message || `User with name: ${name} alreay exists!`});
  }
});

userRouter.get('/', async (_req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.send( data );
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

userRouter.get('/name', async (req, res) => {
  try {
    const name: any = req.query.name;
    const data = await prisma.user.findFirst({
      where: {
        name,
      },
    });
    if(!data) throw new Error('No user found');
    res.send( data );
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

userRouter.put('/', async (req, res) => {
  try {
    const { name, email, updatedEmail = null, updatedName = null } = req.body;
    await await prisma.user.update({
      where: {
        email,
      },
      data: {
        email: updatedEmail || email,
        name: updatedName || name,
      },
    });
    const attrinute = name? 'name' : 'email';
    res.json({ message: `User with ${attrinute}: ${email || name} was updated! Now it's ${attrinute} is ${updatedEmail|| updatedName}!` });
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({ message: `User with id: ${req.params.id} was deleted!` });
  } catch(error) {
    res.status(666).json({message: error});
  }
});

userRouter.delete('/', async (_req, res) => {
  try {
    await prisma.user.deleteMany();
    res.json({ message: 'All users were deleted!' });
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

export default userRouter;
