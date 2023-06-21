import bcrypt from 'bcrypt'

// encode
export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

// decode
export const chechPassword = (password: string, userPassword: string) => {
  return bcrypt.compareSync(password, userPassword)
}
