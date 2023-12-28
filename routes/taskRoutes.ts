import express from 'express';
import * as taskController from '../controllers/taskController';

const router = express.Router();

router.post('/', taskController.submitTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:status', taskController.getTasksByStatus);

export default router;
