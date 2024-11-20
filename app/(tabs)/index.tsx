// types.ts
type Restaurant = {
  id: string;
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  vicinity?: string;
};

type PlacesResponse = {
  results: Array<{
    place_id: string;
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    rating?: number;
    vicinity?: string;
  }>;
  status: string;
};

// App.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const PLACES_API_KEY = "AIzaSyDuZuiyBU-Ua-vEHx5gyKT87ytHycJPkz8"; // Replace with your actual key

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [showTraffic, setShowTraffic] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchNearbyRestaurants = async () => {
    if (!location) return;

    setIsLoading(true);
    try {
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
          `location=${latitude},${longitude}&` +
          `radius=1500&` + // 1.5km radius
          `type=restaurant&` +
          `key=${PLACES_API_KEY}`
      );

      const data: PlacesResponse = await response.json();

      if (data.status === "OK") {
        const formattedRestaurants: Restaurant[] = data.results.map(
          (place) => ({
            id: place.place_id,
            name: place.name,
            coordinate: {
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            },
            rating: place.rating,
            vicinity: place.vicinity,
          })
        );

        setRestaurants(formattedRestaurants);
      } else {
        console.error("Error fetching places:", data.status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showRestaurants && restaurants.length === 0) {
      fetchNearbyRestaurants();
    }
  }, [showRestaurants]);

  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsTraffic={showTraffic}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* User Location Marker */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />

        {/* Restaurant Markers */}
        {showRestaurants &&
          restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.coordinate}
              title={restaurant.name}
              description={`Rating: ${restaurant.rating || "N/A"} - ${
                restaurant.vicinity || ""
              }`}
            >
              <View style={styles.restaurantMarker}>
                <MaterialIcons name="restaurant" size={24} color="white" />
              </View>
            </Marker>
          ))}
      </MapView>

      {/* Control Buttons */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowTraffic(!showTraffic)}
        >
          <Text style={styles.buttonText}>
            {showTraffic ? "Hide Traffic" : "Show Traffic"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={() => {
            setShowRestaurants(!showRestaurants);
            if (!showRestaurants && restaurants.length === 0) {
              fetchNearbyRestaurants();
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {showRestaurants ? "Hide Restaurants" : "Show Restaurants"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  controls: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    minWidth: 120,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#89CFF0",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  restaurantMarker: {
    backgroundColor: "#FF5733",
    padding: 5,
    borderRadius: 15,
  },
  loadingText: {
    marginTop: 10,
    color: "#007AFF",
  },
});
