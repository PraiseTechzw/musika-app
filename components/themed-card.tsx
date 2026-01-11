import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export function ThemedCard({ children, style }: React.PropsWithChildren<{ style?: any }>) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={[styles.card, { backgroundColor: Colors[colorScheme].card }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12,
  },
});
