import React from "react";
import { StyleSheet, View, TextInputProps } from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        error={!!error}
        secureTextEntry={secureTextEntry}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
        right={
          rightIcon ? (
            <TextInput.Icon icon={rightIcon} onPress={onRightIconPress} />
          ) : undefined
        }
        style={styles.input}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        {...props}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: "transparent",
  },
});