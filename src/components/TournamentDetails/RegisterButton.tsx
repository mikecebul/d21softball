'use client'

import { DollarSign } from 'lucide-react'
import { Button } from '../ui/button'

export const RegisterButton = ({ teamName, price }: { teamName: string; price: number }) => {
  const handlePayment = (teamName: string) => {
    console.log(`Forwarding to Stripe Checkout for team: ${teamName}`)
    alert(`Redirecting to Stripe Checkout for ${teamName}`)
  }

  return (
    <Button onClick={() => handlePayment(teamName)} variant="brand" size="fit">
      Pay ${price}
    </Button>
  )
}
