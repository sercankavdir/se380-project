import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

import AppText from "../components/AppText";
import Colors from "../constants/Colors";

const DirectionsScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/324694/analyzedInstructions?stepBreakdown=false",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "7ed870cd97msh9990cc58d3b5af5p19fd61jsn3420831d76e3",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.steps);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => <Text>{item.step}</Text>}
        />
      )}
    </View>
  );
};

DirectionsScreen.navigationOptions = {
  headerTitle: "Directions",
};

export default DirectionsScreen;
