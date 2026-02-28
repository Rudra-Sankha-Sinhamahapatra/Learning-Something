import { useEffect, useState } from 'react'
import Purchases, { PurchasesOffering } from 'react-native-purchases'

export function useOfferings() {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOfferings() {
      try {
        const offerings = await Purchases.getOfferings()
        setOffering(offerings.current)
      } catch (error) {
        console.error('Error fetching offerings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOfferings()
  }, [])

  return { offering, loading }
}