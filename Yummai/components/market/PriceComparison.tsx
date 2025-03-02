import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Card, Divider, List, Chip, useTheme } from "react-native-paper";

interface Store {
  id: string;
  name: string;
  type: "market" | "bazaar" | "online";
}

interface PriceItem {
  id: string;
  ingredientId: string;
  ingredientName: string;
  storeId: string;
  storeName: string;
  storeType: Store["type"];
  price: number;
  unit: string;
  quantity: number;
  lastUpdated: Date;
}

interface PriceComparisonProps {
  items: PriceItem[];
  onStoreSelect?: (storeId: string) => void;
  showHeader?: boolean;
}

export const PriceComparison: React.FC<PriceComparisonProps> = ({
  items,
  onStoreSelect,
  showHeader = true,
}) => {
  const theme = useTheme();

  // Group items by ingredient
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.ingredientId]) {
      acc[item.ingredientId] = [];
    }
    acc[item.ingredientId].push(item);
    return acc;
  }, {} as Record<string, PriceItem[]>);

  const renderStoreItem = ({ item }: { item: PriceItem }) => {
    const storeIconMap = {
      market: "store",
      bazaar: "shopping",
      online: "cart",
    };

    return (
      <Chip
        icon={storeIconMap[item.storeType]}
        style={styles.storeChip}
        onPress={() => onStoreSelect && onStoreSelect(item.storeId)}
        mode="outlined"
      >
        {item.storeName}: {item.price.toFixed(2)} TL
      </Chip>
    );
  };

  const renderIngredientItem = ({ item }: { item: [string, PriceItem[]] }) => {
    const [ingredientId, prices] = item;
    const ingredientName = prices[0].ingredientName;
    
    // Sort prices from lowest to highest
    const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
    const lowestPrice = sortedPrices[0];
    const highestPrice = sortedPrices[sortedPrices.length - 1];
    const priceDifference = highestPrice.price - lowestPrice.price;
    const percentageDifference = (priceDifference / highestPrice.price) * 100;

    return (
      <Card style={styles.ingredientCard}>
        <Card.Content>
          <Text style={styles.ingredientName}>{ingredientName}</Text>
          <View style={styles.priceInfoContainer}>
            <Text style={styles.priceInfo}>
              En düşük: <Text style={styles.lowestPrice}>{lowestPrice.price.toFixed(2)} TL</Text> ({lowestPrice.storeName})
            </Text>
            <Text style={styles.priceInfo}>
              En yüksek: <Text>{highestPrice.price.toFixed(2)} TL</Text> ({highestPrice.storeName})
            </Text>
            <Text style={styles.savingsText}>
              Tasarruf: <Text style={styles.savingsAmount}>{priceDifference.toFixed(2)} TL</Text> (%{percentageDifference.toFixed(0)})
            </Text>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.storesTitle}>Mağaza Fiyatları</Text>
          <View style={styles.storesContainer}>
            {sortedPrices.map((price) => (
              <Chip
                key={price.id}
                icon={price.id === lowestPrice.id ? "check-circle" : undefined}
                style={[styles.storeChip, price.id === lowestPrice.id && styles.bestPriceChip]}
                onPress={() => onStoreSelect && onStoreSelect(price.storeId)}
                mode="outlined"
              >
                {price.storeName}: {price.price.toFixed(2)} TL
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {showHeader && (
        <>
          <Text variant="titleLarge" style={styles.title}>
            Fiyat Karşılaştırması
          </Text>
          <Divider style={styles.headerDivider} />
        </>
      )}
      <FlatList
        data={Object.entries(groupedItems)}
        renderItem={renderIngredientItem}
        keyExtractor={([ingredientId]) => ingredientId}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  headerDivider: {
    height: 1.5,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 12,
  },
  ingredientCard: {
    borderRadius: 12,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  priceInfoContainer: {
    marginVertical: 8,
  },
  priceInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  lowestPrice: {
    fontWeight: "700",
    color: "green",
  },
  savingsText: {
    marginTop: 8,
    fontSize: 14,
  },
  savingsAmount: {
    fontWeight: "700",
    color: "green",
  },
  storesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  storesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  storeChip: {
    margin: 4,
  },
  bestPriceChip: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  separator: {
    height: 16,
  },
});