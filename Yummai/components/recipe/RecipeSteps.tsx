import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Divider, Card, useTheme } from "react-native-paper";

interface Step {
  id: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string;
  tips?: string;
}

interface RecipeStepsProps {
  steps: Step[];
  showHeader?: boolean;
}

export const RecipeSteps: React.FC<RecipeStepsProps> = ({
  steps,
  showHeader = true,
}) => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: Step }) => (
    <Card style={styles.stepCard}>
      <Card.Content>
        <View style={styles.stepNumberContainer}>
          <Text style={[styles.stepNumber, { backgroundColor: theme.colors.primary }]}>
            {item.stepNumber}
          </Text>
        </View>
        <Text style={styles.instruction}>{item.instruction}</Text>
        {item.tips && (
          <Text style={styles.tips}>
            <Text style={{ fontWeight: "bold" }}>İpucu: </Text>
            {item.tips}
          </Text>
        )}
      </Card.Content>
      {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.stepImage} />}
    </Card>
  );

  return (
    <View style={styles.container}>
      {showHeader && (
        <>
          <Text variant="titleLarge" style={styles.title}>
            Hazırlanışı
          </Text>
          <Divider style={styles.divider} />
        </>
      )}
      <FlatList
        data={steps}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  divider: {
    height: 1.5,
    marginBottom: 16,
  },
  stepCard: {
    borderRadius: 12,
    marginBottom: 8,
  },
  stepNumberContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    marginRight: 8,
  },
  instruction: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  tips: {
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.7,
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  stepImage: {
    height: 180,
    marginTop: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  separator: {
    height: 16,
  },
});