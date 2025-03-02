import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Surface, useTheme } from "react-native-paper";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <Surface
        style={[
          styles.bubble,
          isUser
            ? { backgroundColor: theme.colors.primary }
            : { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Text
          style={[
            styles.message,
            isUser ? { color: theme.colors.onPrimary } : { color: theme.colors.onSurfaceVariant },
          ]}
        >
          {message}
        </Text>
      </Surface>
      {timestamp && (
        <Text style={styles.timestamp}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: "80%",
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  aiContainer: {
    alignSelf: "flex-start",
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    alignSelf: "flex-end",
  },
});