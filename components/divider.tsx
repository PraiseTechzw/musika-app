import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Divider({ style }: { style?: any }) {
  const colorScheme = useColorScheme() ?? 'light';
  return <View style={[styles.divider, { backgroundColor: Colors[colorScheme].border }, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 8,
  },
});
