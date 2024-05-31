import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'
import { SiswaRouter } from './siswa.route'
import { UserRouter } from './user.route'
import { TaskRouter } from './task.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/siswa', SiswaRouter],
  ['/auth', UserRouter]
  // ['/task', TaskRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
