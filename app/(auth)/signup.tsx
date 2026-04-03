import SignUpScreen from '../../src/screens/SignUpScreen';
import { useRouter } from 'expo-router';

export default function SignUpRoute() {
  const router = useRouter();
  
  // Mock React Navigation to seamlessly plug their screen into Expo Router
  const mockNavigation = {
    navigate: (route: string) => {
      if (route.toLowerCase() === 'login') {
        router.push('/(auth)/login');
      } else {
        router.push(`/(auth)/${route.toLowerCase()}`);
      }
    }
  };

  return <SignUpScreen navigation={mockNavigation} />;
}
