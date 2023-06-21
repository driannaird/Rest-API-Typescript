import { Application, Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'
import { UserRouter } from './user.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter],
  ['/auth', UserRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
