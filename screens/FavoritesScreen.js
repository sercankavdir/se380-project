import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import AppText from "../components/AppText";

const FavoritesScreen = (props) => {
  return (
    <View style={styles.container}>
      <AppText>The list of favorite meals will be listed here</AppText>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate({ routeName: "MealDetail" })}
      >
        <AppText style={styles.textStyle}>
          Go to Meal Detail For The Selected Meal
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.accentColor,
    padding: 10,
  },
  textStyle: {
    color: "white",
  },
});

FavoritesScreen.navigationOptions = {
  headerTitle: "Favorites",
};

export default FavoritesScreen;
