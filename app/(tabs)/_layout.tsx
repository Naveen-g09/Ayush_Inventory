import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from "react";
import { Pressable } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <>
    
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} name="plus-square" />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Call Screen",
          tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}
