import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  Platform,
} from "react-native";
import { ListItem } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

import AppText from "../components/AppText";
import Colors from "../constants/Colors";

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");
  const mealImage = props.navigation.getParam("mealImage");
  const mealImageUrl = `https://spoonacular.com/recipeImages/${mealImage}`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${mealId}/information`,
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
        setData(json.extendedIngredients);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: mealImageUrl }} />
      <View style={styles.actions}>
        <AppText style={styles.text}>Ingredients</AppText>
      </View>
      <View style={styles.listContainer}>
        {data.map((l, i) => (
          <ListItem key={i} title={l.original} bottomDivider />
        ))}
      </View>
      <View>
        <Button
          color={Colors.accentColor}
          title="Go To Directions"
          onPress={() => {
            props.navigation.navigate("Directions");
          }}
        />
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("mealTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-star" : "ios-star"}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
  actions: {
    marginVertical: 2,
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: Colors.primaryColor,
    textAlign: "center",
    marginVertical: 3,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});

export default MealDetailScreen;
