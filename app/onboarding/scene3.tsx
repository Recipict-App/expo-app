import { StyleSheet, Text, View } from "react-native";

export default function scene3() {
  return (
    <View style={styles.container}>
      <Text>third scene</Text>
    </View>
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
