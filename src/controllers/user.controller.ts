import { createSessionValidation, createUserValidation, refreshSessionValidation } from '../validations/user.validation'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { chechPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/user.service'
import { signJWT, verifyJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()

  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error(`If register user, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)
    return res.status(201).send({ status: true, statusCode: 201, message: 'Success register user' })
  } catch (error) {
    logger.error(`If register, ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error(`If login user, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    const user: any = await findUserByEmail(value.email)

    const isValid = chechPassword(value.password, user.password)

    if (!isValid) {
      return res.status(401).send({ status: false, statusCode: 401, message: 'Invalid email or password' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '5s' })

    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })

    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'Loggin Success', data: [{ accessToken, refreshToken }] })
  } catch (error: any) {
    logger.error(`If login user, ${error.message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }
}

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body)

  if (error) {
    logger.error(`If refresh session, ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }

  try {
    const { decoded }: any = verifyJWT(value.refreshToken)

    const user = await findUserByEmail(decoded._doc.email)

    if (!user) {
      return false
    }

    const accessToken = signJWT(
      {
        ...user
      },
      { expiresIn: '1d' }
    )

    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'Refresh Session Success', data: [{ accessToken }] })
  } catch (error: any) {
    logger.error(`If Refresh session, ${error.message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: [{}] })
  }
}
