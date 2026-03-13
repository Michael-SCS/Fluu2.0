import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >

        <Tabs.Screen
          name="index"
          options={{
            title: "Today",            
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            
          }}
        />

      </Tabs>

    </View>
  );
}