import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

type Choice = "rock" | "paper" | "scissors";

interface ChoiceImages {
  [key: string]: ImageSourcePropType;
}

const choices: Choice[] = ["rock", "paper", "scissors"];
const choiceImages: ChoiceImages = {
  rock: require("../../assets/rock.png"),
  paper: require("../../assets/paper.png"),
  scissors: require("../../assets/scissors.png"),
};

export default function RockPaperScissors() {
  const colorScheme = useColorScheme();
  const [playerScore, setPlayerScore] = useState<number>(3);
  const [computerScore, setComputerScore] = useState<number>(2);
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);

  const play = (choice: Choice): void => {
    const computerMove = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computerMove);

    if (choice === computerMove) {
      return;
    }

    if (
      (choice === "rock" && computerMove === "scissors") ||
      (choice === "paper" && computerMove === "rock") ||
      (choice === "scissors" && computerMove === "paper")
    ) {
      setPlayerScore((prev) => prev + 1);
    } else {
      setComputerScore((prev) => prev + 1);
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
        Piedra, Papel, Tijeras
      </Text>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
            Jugador
          </Text>
          <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
            {playerScore}
          </Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
            Computadora
          </Text>
          <Text style={{ color: colorScheme === "dark" ? "#fff" : "#000" }}>
            {computerScore}
          </Text>
        </View>
      </View>

      <View style={styles.choicesContainer}>
        {computerChoice && (
          <Image
            source={choiceImages[computerChoice]}
            style={[
              styles.choiceImage,
              { tintColor: colorScheme === "dark" ? "#fff" : undefined },
            ]}
          />
        )}
      </View>

      <View style={styles.playerChoices}>
        {choices.map((choice) => (
          <TouchableOpacity key={choice} onPress={() => play(choice)}>
            <Image
              source={choiceImages[choice]}
              style={[
                styles.choiceImage,
                { tintColor: colorScheme === "dark" ? "#fff" : undefined },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {playerChoice && (
        <TouchableOpacity
          style={[
            styles.resultButton,
            { backgroundColor: colorScheme === "dark" ? "#333" : "#f0f0f0" },
          ]}
        >
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
              fontSize: 16,
            }}
          >
            R: JUGADOR
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    padding: 5,
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
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  scoreBox: {
    alignItems: "center",
  },
  choicesContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  playerChoices: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  choiceImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  resultButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
});
