import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Card as PaperCard, Text } from "react-native-paper";

interface CardProps {
  title?: string;
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  coverImage?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  style,
  onPress,
  coverImage,
}) => {
  return (
    <PaperCard style={[styles.card, style]} onPress={onPress}>
      {coverImage && <PaperCard.Cover source={{ uri: coverImage }} />}
      {title && (
        <PaperCard.Title
          title={title}
          titleStyle={styles.title}
        />
      )}
      <PaperCard.Content style={styles.content}>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    paddingVertical: 8,
  },
});