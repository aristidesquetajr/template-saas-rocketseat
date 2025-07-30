import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

type StripeCheckout = {
  testeId: string
}

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!)
      setStripe(stripeInstance)
    }

    loadStripeAsync()
  }, [])

  async function createPaymentStripeCheckout(checkout: StripeCheckout) {
    if (!stripe) return

    try {
      const response = await fetch('/api/stripe/create-pay-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkout)
      })

      const data = await response.json()

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error('Error creating Stripe pay checkout:\n', error)
    }
  }

  async function createSubscriptionStripeCheckout(checkout: StripeCheckout) {
    if (!stripe) return

    try {
      const response = await fetch('/api/stripe/create-subscription-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkout)
      })

      const data = await response.json()

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error('Error creating Stripe subscription checkout:\n', error)
    }
  }

  async function handleCreateStripePortal() {
    if (!stripe) return

    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      window.location.href = data.url
    } catch (error) {
      console.error('Error creating Stripe portal:\n', error)
    }
  }

  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal
  }
}
