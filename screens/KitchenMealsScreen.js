import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  Button,
} from "react-native";
import MealItem from "../components/MealItem";
import Colors from "../constants/Colors";
import AppText from "../components/AppText";

const KitchenMealsScreens = (props) => {
  const cuisineId = props.navigation.getParam("cuisine");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?cuisine=${cuisineId}`,
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
      .then((json) => setData(json.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const selectItemHandler = (id, title, image) => {
    props.navigation.navigate("MealDetail", {
      mealId: id,
      mealTitle: title,
      mealImage: image,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <AppText>An Error Occurred. Please try again later!</AppText>
        <Button
          title="Go Back"
          color={Colors.primaryColor}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={({ id }, index) => id.toString()}
      renderItem={({ item }) => (
        <MealItem
          image={item.image}
          title={item.title}
          readyInMinutes={item.readyInMinutes}
          servings={item.servings}
          onSelect={() => {
            selectItemHandler(item.id, item.title, item.image);
          }}
        ></MealItem>
      )}
    />
  );
};

KitchenMealsScreens.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("cuisineTitle"),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default KitchenMealsScreens;
