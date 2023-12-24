import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

export default function scene1() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONT.bold,
          color: COLORS.green,
          fontSize: SIZES.xl,
        }}
      >
        first scenewwww
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#",
    alignItems: "center",
    justifyContent: "center",
  },
});
