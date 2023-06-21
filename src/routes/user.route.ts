import { Router } from 'express'
import { registerUser, createSession, refreshSession } from '../controllers/user.controller'

export const UserRouter: Router = Router()

UserRouter.post('/register', registerUser)
UserRouter.post('/login', createSession)
UserRouter.post('/refresh', refreshSession)
