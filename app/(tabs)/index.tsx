import { Link } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.buttonContainer}>
        <Link href="/temp" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Temperature Converter</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/rockpaperscissors" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Rock Paper Scissors</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    fontFamily: "SpaceMono",
  },
  buttonContainer: {
    gap: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
