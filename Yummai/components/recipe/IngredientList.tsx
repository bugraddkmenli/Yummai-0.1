import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Divider, List, useTheme } from "react-native-paper";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  showHeader?: boolean;
}

export const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  showHeader = true,
}) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: Ingredient }) => (
    <List.Item
      title={item.name}
      description={item.notes}
      right={() => (
        <Text style={styles.quantity}>
          {item.quantity} {item.unit}
        </Text>
      )}
      titleStyle={styles.ingredientName}
      descriptionStyle={styles.notes}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      {showHeader && (
        <>
          <Text variant="titleLarge" style={styles.title}>
            Malzemeler
          </Text>
          <Divider style={styles.divider} />
        </>
      )}
      <FlatList
        data={ingredients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <Divider style={styles.itemDivider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontWeight: "700",
    marginBottom: 8,
  },
  divider: {
    height: 1.5,
    marginBottom: 16,
  },
  itemDivider: {
    height: 0.5,
    opacity: 0.3,
  },
  listItem: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "500",
  },
  quantity: {
    fontSize: 14,
    opacity: 0.8,
    alignSelf: "center",
  },
  notes: {
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.6,
  },
});