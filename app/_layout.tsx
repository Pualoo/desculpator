import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ 
      title: "Jogonator",
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
      },
      headerStyle: {
        backgroundColor: '#00ccbfff'
      },
      headerTintColor: '#fff',
     }}></Stack.Screen>
  </Stack>;
}
