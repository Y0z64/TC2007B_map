import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { styles } from ".";

interface QuadraticResult {
  x1: string;
  x2: string;
  error?: string;
}

export default function QuadraticSolver() {
  const colorScheme = useColorScheme();
  const [coefficients, setCoefficients] = useState({
    a: "",
    b: "",
    c: "",
  });
  const [result, setResult] = useState<QuadraticResult | null>(null);

  const solveQuadratic = () => {
    const a = parseFloat(coefficients.a);
    const b = parseFloat(coefficients.b);
    const c = parseFloat(coefficients.c);

    if (a === 0) {
      setResult({
        x1: "",
        x2: "",
        error: "No es una ecuación cuadrática (a=0)",
      });
      return;
    }

    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setResult({
        x1: x1.toFixed(2),
        x2: x2.toFixed(2),
      });
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      setResult({
        x1: x.toFixed(2),
        x2: x.toFixed(2),
      });
    } else {
      const realPart = (-b / (2 * a)).toFixed(2);
      const imaginaryPart = (
        Math.sqrt(Math.abs(discriminant)) /
        (2 * a)
      ).toFixed(2);
      setResult({
        x1: `${realPart} + ${imaginaryPart}i`,
        x2: `${realPart} - ${imaginaryPart}i`,
      });
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
        Ecuación Cuadrática
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colorScheme === "dark" ? "#fff" : "#000" },
        ]}
      >
        ax² + bx + c = 0
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colorScheme === "dark" ? "#fff" : "#000",
              color: colorScheme === "dark" ? "#fff" : "#000",
            },
          ]}
          placeholder="Valor de a"
          placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
          value={coefficients.a}
          onChangeText={(text) => setCoefficients({ ...coefficients, a: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colorScheme === "dark" ? "#fff" : "#000",
              color: colorScheme === "dark" ? "#fff" : "#000",
            },
          ]}
          placeholder="Valor de b"
          placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
          value={coefficients.b}
          onChangeText={(text) => setCoefficients({ ...coefficients, b: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: colorScheme === "dark" ? "#fff" : "#000",
              color: colorScheme === "dark" ? "#fff" : "#000",
            },
          ]}
          placeholder="Valor de c"
          placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
          value={coefficients.c}
          onChangeText={(text) => setCoefficients({ ...coefficients, c: text })}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={solveQuadratic}>
        <Text style={styles.buttonText}>Resolver</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultContainer}>
          {result.error ? (
            <Text style={[styles.errorText, { color: "#ff0000" }]}>
              {result.error}
            </Text>
          ) : (
            <>
              <Text
                style={[
                  styles.resultText,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}
              >
                x₁ = {result.x1}
              </Text>
              <Text
                style={[
                  styles.resultText,
                  { color: colorScheme === "dark" ? "#fff" : "#000" },
                ]}
              >
                x₂ = {result.x2}
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
}

