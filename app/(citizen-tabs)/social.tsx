import SocialScreen from '../../src/screens/SocialScreen';
import { useRouter } from 'expo-router';

export default function SocialRoute() {
  const router = useRouter();
  const mockNavigation = { navigate: (route: string) => router.push(`/(tabs)/${route.toLowerCase()}`) };
  return <SocialScreen navigation={mockNavigation} />;
}
