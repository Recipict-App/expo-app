import { StyleSheet, Text, View } from "react-native";

export default function scene2() {
  return (
    <View style={styles.container}>
      <Text>second scene</Text>
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
