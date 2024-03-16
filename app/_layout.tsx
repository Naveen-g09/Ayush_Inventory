import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from "@/components/useColorScheme";
import { Pressable } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    
    <ThemeProvider
      value={colorScheme === "light" ? DefaultTheme : DefaultTheme}
    >
<GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
     screenOptions={{
      // Disable the static render of the header on web
      // to prevent a hydration error in React Navigation v6.
      // headerShown: useClientOnlyValue(false, true),
      // headerTitle: "Ayush Inventory",
      headerStyle: {
        backgroundColor: "lavender",
        elevation: 4,
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",

      },
      headerTitleAlign: "center",
      headerPressColor: "rgba(0, 0, 0, .32)",
      headerRight: () => (
        <Link href="/notifications" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="bell-o"
                size={25}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }}
      >

<Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Inventory',
            title: 'Ayush Inventory',
          }}
        />


        <Drawer.Screen
        name="contacts"
        options={{
          drawerLabel: 'Contacts',
          title: 'Contacts',
        }}
      />


<Drawer.Screen
          name="lessStock"
          options={{
            drawerLabel: 'Minimal Stock',
            title: 'Minimal Stock',
          }}
        />

<Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notifications',
            title: 'Notifications',
            drawerItemStyle: { display: "none" },
          }}
        />

<Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { display: "none" }
          }}
        />


      </Drawer>
    </GestureHandlerRootView>
    </ThemeProvider>
  );
}
