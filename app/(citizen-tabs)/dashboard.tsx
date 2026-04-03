import Dashboard from '../../src/screens/Dashboard';
import { useRouter } from 'expo-router';

export default function DashboardRoute() {
  const router = useRouter();
  const mockNavigation = { navigate: (route: string) => router.push(`/(tabs)/${route.toLowerCase()}`) };
  return <Dashboard navigation={mockNavigation} />;
}
