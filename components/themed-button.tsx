import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function ThemedButton({ title, style, ...props }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[colorScheme].tint }, style]}
      {...props}
    >
      <Text style={[styles.text, { color: Colors[colorScheme].background, fontFamily: Fonts.bold }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
