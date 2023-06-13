import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()
const port: number = 4000

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(400).send({ status: '200', data: 'hello world' })
})

app.listen(port, () => console.log(`Server is listen on port ${port}`))
