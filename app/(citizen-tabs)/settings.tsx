import SettingsScreen from '../../src/screens/SettingsScreen';
import { useRouter } from 'expo-router';

export default function SettingsRoute() {
  const router = useRouter();
  const mockNavigation = { navigate: (route: string) => router.push(`/(tabs)/${route.toLowerCase()}`) };
  return <SettingsScreen navigation={mockNavigation} />;
}
