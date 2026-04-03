import ReportIssue from '../../src/screens/ReportIssue';
import { useRouter } from 'expo-router';

export default function ReportRoute() {
  const router = useRouter();
  const mockNavigation = { navigate: (route: string) => router.push(`/(tabs)/${route.toLowerCase()}`) };
  return <ReportIssue navigation={mockNavigation} />;
}
