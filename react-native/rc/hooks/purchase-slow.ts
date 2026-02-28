import Purchases from 'react-native-purchases'

export async function purchasePackage(pkg: any) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg)

    if (customerInfo.entitlements.active['rudra_pro']) {
      console.log('Rudra Pro unlocked')
    }

    return customerInfo
  } catch (error: any) {
    if (!error.userCancelled) {
      console.error('Purchase error:', error)
    }
    throw error
  }
}