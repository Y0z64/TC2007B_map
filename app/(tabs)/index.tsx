import { useState } from "react";
import { Link, router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";

const VALID_USER = "admin";
const VALID_PASSWORD = "password123";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === VALID_USER && password === VALID_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
      {!isLoggedIn ? (
        <>
          <Text
            style={[
              styles.title,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Login
          </Text>

          <Text
            style={[
              styles.infoText,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Usuario: admin{"\n"}
            Contraseña: password123
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: colorScheme === "dark" ? "#fff" : "#000",
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
            placeholder="Usuario"
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={[
              styles.input,
              {
                borderColor: colorScheme === "dark" ? "#fff" : "#000",
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
            placeholder="Contraseña"
            placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.menuContainer}>
          <Text
            style={[
              styles.title,
              { color: colorScheme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Menu Principal
          </Text>

          <View style={styles.buttonContainer}>
            <Link href="/temp" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  Convertidor de Temperatura
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/rockpaperscissors" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Piedra, Papel o Tijera</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/quadratic" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Ecuación Cuadrática</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => setIsLoggedIn(false)}
          >
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "SpaceMono",
  },
  infoText: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "SpaceMono",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
});