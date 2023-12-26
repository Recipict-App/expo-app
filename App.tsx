import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { SheetProvider } from "react-native-actions-sheet";
import "sheets.tsx";

export default function App() {
  return (
    <SheetProvider>
      <View style={styles.container}>
        <Text>App in the root</Text>
        <StatusBar style="auto" />
      </View>
    </SheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
