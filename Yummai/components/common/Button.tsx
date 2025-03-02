import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import { useTheme } from "react-native-paper";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = "primary", 
  style, 
  ...props 
}) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return [styles.button, { backgroundColor: theme.colors.secondary }, style];
      case "outline":
        return [styles.button, { 
          backgroundColor: "transparent", 
          borderWidth: 1, 
          borderColor: theme.colors.primary 
        }, style];
      default:
        return [styles.button, { backgroundColor: theme.colors.primary }, style];
    }
  };

  const getTextStyle = () => {
    if (variant === "outline") {
      return [styles.text, { color: theme.colors.primary }];
    }
    return [styles.text, { color: theme.colors.surface }];
  };

  return (
    <TouchableOpacity style={getButtonStyle()} {...props}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});