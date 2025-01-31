import Koa, { Middleware } from 'koa'
import { ssoHandler } from '../../helpers'

export const getItineraries: Middleware = async (ctx: Koa.Context) => {
  const data = await ssoHandler.getItineraries()
  ctx.status = 200
  ctx.body = data
}
