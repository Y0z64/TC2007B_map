import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "./rockpaperscissors";

export default function TemperatureConverter() {
  const colorScheme = useColorScheme();
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<string>("");

  const convertTemperature = (): void => {
    if (celsius) {
      const fahrenheitValue = (parseFloat(celsius) * 9) / 5 + 32;
      setFahrenheit(fahrenheitValue.toFixed(1));
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}
      >
        Convertidor de temperaturas
      </Text>

      <Text
        style={[
          styles.label,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}
      >
        Grados Celsius:
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderBottomColor: colorScheme === "dark" ? "#fff" : "#6200ee",
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
        ]}
        value={celsius}
        onChangeText={setCelsius}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
      />

      <Text
        style={[
          styles.label,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}
      >
        Grados Fahrenheit:
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderBottomColor: colorScheme === "dark" ? "#fff" : "#6200ee",
            color: colorScheme === "dark" ? "#fff" : "#000",
          },
        ]}
        value={fahrenheit}
        editable={false}
        placeholder="0.0"
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
      />

      <TouchableOpacity style={styles.button} onPress={convertTemperature}>
        <Text style={styles.buttonText}>CONVERTIR</Text>
      </TouchableOpacity>
    </View>
  );
}
