// Redirect to (tabs)/products for Expo Router compatibility
import { Redirect } from 'expo-router';

export default function ProductsIndex() {
  return <Redirect href="/(tabs)/products" />;
}
