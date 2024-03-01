import { Request, Response } from 'express'

export const ping = (req: Request, res: Response): void => {
  res.set('Cache-Control', 'no-store, must-revalidate')
  res.status(200).send('pong')
}

