import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import KitchenScreen from "../screens/KitchenScreen";
import KitchenMealsScreen from "../screens/KitchenMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import DirectionsScreen from "../screens/DirectionsScreen";
import AuthScreen from "../screens/AuthScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerTintColor: Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTitle: "Screen",
};

const AppNavigator = createStackNavigator(
  {
    Kitchen: {
      screen: KitchenScreen,
    },
    KitchenMeals: {
      screen: KitchenMealsScreen,
    },
    MealDetail: {
      screen: MealDetailScreen,
    },
    Directions: {
      screen: DirectionsScreen,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabConfiguration = {
  Kitchen: {
    screen: AppNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons
            name="restaurant-menu"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Kitchen</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-search" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Search</Text>
        ) : (
          "Search"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabConfiguration, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabConfiguration, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.primaryColor,
        },
      });

const MainNavigator = createSwitchNavigator({
  Auth: {
    screen: AuthNavigator,
  },
  Meal: {
    screen: MealsFavTabNavigator,
  },
});

export default createAppContainer(MainNavigator);
