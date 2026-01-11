import React from 'react';
import { StyleSheet, View } from 'react-native';

export function Spacer({ size = 16 }: { size?: number }) {
  return <View style={{ height: size }} />;
}

export const spacerStyles = StyleSheet.create({
  small: { height: 8 },
  medium: { height: 16 },
  large: { height: 32 },
});
