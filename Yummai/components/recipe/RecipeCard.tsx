import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Card, Text, Chip, useTheme } from "react-native-paper";
import { Link } from "expo-router";

interface RecipeCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prepTime?: number;
  cookTime?: number;
  difficulty?: string;
  cuisineType?: string;
  compact?: boolean;
  onPress?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  prepTime,
  cookTime,
  difficulty,
  cuisineType,
  compact = false,
  onPress,
}) => {
  const theme = useTheme();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Card 
      style={[styles.card, compact && styles.compactCard]} 
      onPress={handlePress}
    >
      <Card.Cover 
        source={{ uri: imageUrl }} 
        style={compact ? styles.compactImage : styles.image}
      />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>{name}</Text>
        {!compact && (
          <Text variant="bodyMedium" style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
        
        {!compact && (
          <View style={styles.metaContainer}>
            {prepTime && cookTime && (
              <Chip 
                icon="clock-outline" 
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {prepTime + cookTime} dk
              </Chip>
            )}
            
            {difficulty && (
              <Chip 
                icon="chef-hat" 
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {difficulty}
              </Chip>
            )}
            
            {cuisineType && (
              <Chip 
                icon="food-variant" 
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {cuisineType}
              </Chip>
            )}
          </View>
        )}
      </Card.Content>
      <Card.Actions>
        <Link href={`/recipe/${id}`} asChild>
          <TouchableOpacity>
            <Text style={{ color: theme.colors.primary }}>Detaylar</Text>
          </TouchableOpacity>
        </Link>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 2,
    borderRadius: 12,
    elevation: 2,
    width: 300,
  },
  compactCard: {
    width: 180,
    marginHorizontal: 6,
  },
  image: {
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  compactImage: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingVertical: 8,
  },
  title: {
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
    opacity: 0.8,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    marginRight: 6,
    marginBottom: 6,
    height: 28,
  },
  chipText: {
    fontSize: 12,
  },
});