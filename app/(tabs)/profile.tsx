import ProfileScreen from '../../src/screens/ProfileScreen';
import { useRouter } from 'expo-router';

export default function ProfileRoute() {
  const router = useRouter();
  const mockNavigation = { navigate: (route: string) => router.push(`/(tabs)/${route.toLowerCase()}`) };
  return <ProfileScreen navigation={mockNavigation} />;
}
