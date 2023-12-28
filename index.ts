import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization;

  if (token !== `Bearer ${process.env.API_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.use('/', authenticate, taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
