import LoginScreen from '../../src/screens/LoginScreen';
import { useRouter } from 'expo-router';

export default function LoginRoute() {
  const router = useRouter();
  
  // Mock React Navigation to seamlessly plug their screen into Expo Router
  const mockNavigation = {
    navigate: (route: string) => {
      if (route.toLowerCase() === 'signup') {
        router.push('/(auth)/signup');
      } else {
        router.push(`/(auth)/${route.toLowerCase()}`);
      }
    }
  };

  return <LoginScreen navigation={mockNavigation} />;
}
