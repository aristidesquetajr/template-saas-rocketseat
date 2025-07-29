import { z } from 'zod'

const envSchema = z.object({
  AUTH_SECRET: z.string({ error: 'AUTH_SECRET is required' }),
  AUTH_GOOGLE_ID: z.string({ error: 'AUTH_GOOGLE_ID is required' }),
  AUTH_GOOGLE_SECRET: z.string({ error: 'AUTH_GOOGLE_SECRET is required' }),
  FIREBASE_PROJECT_ID: z.string({ error: 'FIREBASE_PROJECT_ID is required' }),
  FIREBASE_CLIENT_EMAIL: z.email({
    error: 'FIREBASE_CLIENT_EMAIL must be a valid email'
  }),
  FIREBASE_PRIVATE_KEY: z.string({ error: 'FIREBASE_PRIVATE_KEY is required' }),
  FIREBASE_STORAGE_BUCKET: z.string().nullish(),
  STRIPE_SECRET_KEY: z.string({ error: 'STRIPE_SECRET_KEY is required' }),
  STRIPE_PRODUCT_PRICE_ID: z.string({
    error: 'STRIPE_PRODUCT_PRICE_ID is required'
  }),
  STRIPE_SUBSCRIPTION_PRICE_ID: z.string({
    error: 'STRIPE_SUBCRIPTION_PRICE_ID is required'
  }),
  STRIPE_WEBHOOK_SECRET: z.string({
    error: 'STRIPE_WEBHOOK_SECRET is required'
  })
})
export const env = envSchema.parse(process.env)
