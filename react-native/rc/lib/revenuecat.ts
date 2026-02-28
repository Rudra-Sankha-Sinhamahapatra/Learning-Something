import Purchases, { LOG_LEVEL } from "react-native-purchases";

export const REVENUECAT_API_KEY =
  process.env.EXPO_PUBLIC_RC_API_KEY_IOS || "";

export async function initRevenueCat(userId?: string) {
  try {
    await Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: userId,
    });

    console.log("RevenueCat initialized");
  } catch (error) {
    console.error("RevenueCat init error:", error);
  }
}
