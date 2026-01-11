import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function FloatingActionButton({ onPress }: { onPress: () => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity style={[styles.fab, { backgroundColor: Colors[colorScheme].tint }]} onPress={onPress}>
      <View>
        <IconSymbol name="plus" size={28} color={Colors[colorScheme].background} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
