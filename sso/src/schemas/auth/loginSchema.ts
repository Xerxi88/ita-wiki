import z from 'zod'
import { userSchema } from './userSchema'

export const loginSchema = userSchema.pick({ dni: true, password: true })

export type UserLogin = z.infer<typeof loginSchema>
