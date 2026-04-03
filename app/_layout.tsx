import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../src/firebase/firebaseconfig";
import { PointsProvider } from "../src/context/PointsContext";
import "../src/i18n";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        try {
          const docRef = doc(db, "users", usr.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole(docSnap.data().role || "user");
          } else {
            setRole("user");
          }
        } catch (e) {
          console.error("Error fetching role: ", e);
          setRole("user");
        }
      } else {
        setRole(null);
      }
      setUser(usr);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to appropriate Home based on role
      if (role === "fieldworker" || role === "admin") {
         router.replace('/(worker-tabs)/dashboard');
      } else {
         router.replace('/(citizen-tabs)/dashboard');
      }
    }
  }, [user, initializing, segments, role]);

  // Don't render full UI until initialized
  if (initializing) return null;

  return (
    <PointsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(citizen-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(worker-tabs)" options={{ headerShown: false }} />
      </Stack>
    </PointsProvider>
  );
}
