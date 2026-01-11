import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AnalyticsScreen() {
  // Placeholder for future analytics (e.g., best-selling products, trends)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <Text>Coming soon: Visual summaries and trends for your shop.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
