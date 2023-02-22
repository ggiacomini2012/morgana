import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// import controller from './controllers';
// import middlewares from './middlewares';

const agendaRouter = express.Router();

agendaRouter.post('/', async (req, res) => {
  try {
    const { info, userId } = req.body;
    await prisma.agenda.create({
      data: {
        userId,
        info,
      },
    });
    res.json({ message: `agenda was created!` });
  } catch(error) {
     res.status(333).json({message: error.message || `error!`});
  }
});

// agendaRouter.get('/', async (_req, res) => {
//   try {
//     const data = await prisma.agenda.findMany();
//     res.send( data );
//   } catch(error) {
//     res.status(666).json({message: error.message});
//   }
// });

// #GET BY USER NAME
agendaRouter.get('/userid', async (req, res) => {
  try {
    const userId: any = req.query.userId;
    const data = await prisma.agenda.findUnique({
      where: {
        userId: Number(userId)
      },
    });
    if(!data) throw new Error('No agenda found');
    res.send( data );
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

// #UPDATE
agendaRouter.put('/', async (req, res) => {
  try {
    const { userId, info } = req.body;
    await await prisma.agenda.update({
      where: {
        userId,
      },
      data: {
        info,
      },
    });
    res.json({ message: `agenda was updated!!` });
  } catch(error) {
    res.status(666).json({message: error.message});
  }
});

// #DELETE BY USER
// agendaRouter.delete('/:id', async (req, res) => {
//   try {
//     await prisma.agenda.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.json({ message: `agenda with id: ${req.params.id} was deleted!` });
//   } catch(error) {
//     res.status(666).json({message: error});
//   }
// });

agendaRouter.delete('/', async (_req, res) => {
  try {
    await prisma.agenda.deleteMany();
    res.json({ message: 'All agendas were deleted!' });
  } catch(error) {
    res.status(666).json({message: error});
  }
});

export default agendaRouter;
