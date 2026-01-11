
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getProducts } from '../../hooks/product';
import { getProfitSummary } from '../../hooks/sales';
import { getLowStockProducts } from '../../hooks/stock';

export default function DashboardScreen() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [profitToday, setProfitToday] = useState(0);
  const [profitMonth, setProfitMonth] = useState(0);
  const [lowStock, setLowStock] = useState<any[]>([]);

  const loadDashboard = async () => {
    const products = await getProducts();
    setTotalProducts(products.length);
    setTotalStockValue(products.reduce((sum, p) => sum + (p.buying_price * p.quantity), 0));
    setLowStock(await getLowStockProducts());
    setProfitToday(await getProfitSummary('day'));
    setProfitMonth(await getProfitSummary('month'));
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.item}>Total Products: {totalProducts}</Text>
      <Text style={styles.item}>Total Stock Value: {totalStockValue}</Text>
      <Text style={styles.item}>Today's Profit: {profitToday}</Text>
      <Text style={styles.item}>Monthly Profit: {profitMonth}</Text>
      <Text style={styles.header}>Low Stock Alerts</Text>
      <FlatList
        data={lowStock}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.lowStock}>{item.name} (Stock: {item.quantity})</Text>
        )}
        ListEmptyComponent={<Text style={styles.item}>No low stock products.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  item: { fontSize: 18, marginBottom: 8 },
  lowStock: { color: 'red', fontSize: 16, marginBottom: 4 },
});
