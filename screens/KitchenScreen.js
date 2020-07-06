import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import { CUISINES } from "../data/dummy-data";
import CuisineGrid from "../components/CuisineGrid";

const KitchenScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CuisineGrid
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "KitchenMeals",
            params: {
              cuisine: itemData.item.id,
              cuisineTitle: itemData.item.title,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CUISINES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

KitchenScreen.navigationOptions = {
  headerTitle: "Cuisines",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default KitchenScreen;
