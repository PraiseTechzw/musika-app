import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function ThemedLoader() {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
