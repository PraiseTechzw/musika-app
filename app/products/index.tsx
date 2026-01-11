import { Divider } from '@/components/divider';
import { Spacer } from '@/components/spacer';
import { ThemedButton } from '@/components/themed-button';
import { ThemedCard } from '@/components/themed-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

export type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  profit: number;
  imageUri?: string;
};

export default function ProductListScreen() {
  // Placeholder for product state (should be persisted locally in a real app)
  const [products, setProducts] = useState<Product[]>([]);

  // Inventory and profit analytics
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.profit, 0);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Products</ThemedText>
      <ThemedCard style={styles.summaryContainer}>
        <ThemedText style={styles.summaryText}>Total Stock: {totalStock}</ThemedText>
        <ThemedText style={styles.summaryText}>Total Profit: ${totalProfit}</ThemedText>
      </ThemedCard>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedCard style={styles.productItem}>
            <ThemedText style={styles.productName}>{item.name}</ThemedText>
            <ThemedText>Qty: {item.quantity}</ThemedText>
            <ThemedText>Price: ${item.price}</ThemedText>
            <ThemedText>Profit: ${item.profit}</ThemedText>
            {item.imageUri && (
              <Image source={{ uri: item.imageUri }} style={styles.image} />
            )}
            {/* Edit/delete buttons and low stock warning will be added later */}
          </ThemedCard>
        )}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<ThemedText>No products yet.</ThemedText>}
      />
      <Spacer size={16} />
      <Link href="/products/add" asChild>
        <ThemedButton title="Add Product" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 16 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryText: { fontSize: 16, fontWeight: '600' },
  productItem: { marginBottom: 8 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  image: { width: 60, height: 60, marginTop: 8, borderRadius: 6 },
});
