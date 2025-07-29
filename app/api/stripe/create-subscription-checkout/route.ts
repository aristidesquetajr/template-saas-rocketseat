import { auth } from '@/app/lib/auth'
import { stripe } from '@/app/lib/stripe'
import { getOrCreateCustomer } from '@/app/server/stripe/get-customer-id'
import { env } from '@/env'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { testeId } = await req.json()

  const price = env.STRIPE_SUBSCRIPTION_PRICE_ID

  //Opcional
  if (!price) {
    return new Response('Price not found', { status: 500 })
  }

  const session = await auth()
  const userId = session?.user?.id
  const userEmail = session?.user?.email

  if (!userId || !userEmail) {
    return new Response('Unauthorized', { status: 401 })
  }

  await getOrCreateCustomer(userId, userEmail)

  const metadata = {
    testeId,
    price,
    userId
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: 'subscription',
      payment_method_types: ['card'],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Session URL not found' },
        { status: 500 }
      )
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
