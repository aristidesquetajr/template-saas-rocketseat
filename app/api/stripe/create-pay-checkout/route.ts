import { stripe } from '@/app/lib/stripe'
import { env } from '@/env'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json()

  const price = env.STRIPE_PRODUCT_PRICE_ID

  //Opcional
  if (!price) {
    return new Response('Price not found', { status: 500 })
  }

  const metadata = {
    testeId,
    price
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/`,
      ...(userEmail && { customer_email: userEmail }),
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
