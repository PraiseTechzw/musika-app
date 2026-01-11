import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LowStockReminderScreen() {
  // Placeholder for future low stock reminders
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Low Stock Reminders</Text>
      <Text>Coming soon: Get notified when products are running low.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
