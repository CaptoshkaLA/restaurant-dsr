import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { LoginDTO } from '../dtos/authDTO';

export const login = async (req: Request, res: Response) => {
  const loginDTO: LoginDTO = req.body;

  try {
    const authResponse = await authService.login(loginDTO);
    res.json(authResponse);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(' ')[1] || '';

  try {
    const authResponse = await authService.refreshToken(refreshToken);
    res.json(authResponse);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};