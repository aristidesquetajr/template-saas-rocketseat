'use client'

import { useStripe } from '@/app/hooks/useStripe'

export default function PagamentosPage() {
  const {
    handleCreateStripePortal,
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout
  } = useStripe()

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Pagamentos</h1>

      <button
        className="border rounded-md px-1"
        onClick={() =>
          createPaymentStripeCheckout({
            testeId: '123'
          })
        }
      >
        Criar Pagamento Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={() =>
          createSubscriptionStripeCheckout({
            testeId: '123'
          })
        }
      >
        Criar Assinatura Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={handleCreateStripePortal}
      >
        Criar Portal de Pagamentos
      </button>
    </div>
  )
}
