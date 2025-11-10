import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="home" options={{ title: "Home" }} />
        <Drawer.Screen name="dash" options={{ title: "Dashboards" }} />
        <Drawer.Screen name="perfil" options={{ title: "Perfil do Usuário" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
