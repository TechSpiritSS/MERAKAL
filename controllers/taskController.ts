import { Request, Response } from 'express';
import * as taskModel from '../models/taskModel';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitTask = async (req: Request, res: Response) => {
  try {
    const { endpoint, delay = 0, method = 'POST', data } = await req.body;

    const task = await prisma.task.create({
      data: {
        endpoint: endpoint as string,
        status: 'queued',
        data: data !== null ? JSON.stringify(data) : undefined,
      },
    });
    setTimeout(async () => {
      console.log('Executing task after delay...');
      try {
        // Execute the task
        const response = await fetch(endpoint as string, {
          method: method as string,
          headers: { 'Content-Type': 'application/json' },
          body: data ? JSON.stringify(data) : undefined,
        });

        await prisma.task.update({
          where: { id: task.id },
          data: { status: response.ok ? 'complete' : 'failed' },
        });
      } catch (error) {
        console.error('Error executing task:', error);
      }
    }, parseInt(delay as string));

    return res
      .status(202)
      .json({ message: 'Task queued successfully', taskId: task.id });
  } catch (error) {
    console.error('Error processing task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.getTasks();
    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTasksByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const tasks = await taskModel.getTasksByStatus(status);
    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
