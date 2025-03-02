'use client'

import { DollarSign } from 'lucide-react'
import { Button } from '../ui/button'

export const RegisterButton = ({ teamName }: { teamName: string }) => {
  const handlePayment = (teamName: string) => {
    console.log(`Forwarding to Stripe Checkout for team: ${teamName}`)
    alert(`Redirecting to Stripe Checkout for ${teamName}`)
  }

  return (
    <Button onClick={() => handlePayment(teamName)} variant="brand" size="fit">
      <DollarSign className="mr-1 h-4 w-4" />
      Pay $500
    </Button>
  )
}
