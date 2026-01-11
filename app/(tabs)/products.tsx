
import React, { useEffect, useState } from 'react';
import { Alert, Button, Modal, View } from 'react-native';
import ProductForm from '../../components/ProductForm';
import ProductList from '../../components/ProductList';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../../hooks/product';
import { Product } from '../../types/db';

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = async (product: Omit<Product, 'id'>, imageUri?: string) => {
    await addProduct(product, imageUri);
    setModalVisible(false);
    loadProducts();
  };

  const handleEdit = async (product: Omit<Product, 'id'>, imageUri?: string) => {
    if (editing) {
      await updateProduct({ ...editing, ...product }, imageUri);
      setEditing(null);
      setModalVisible(false);
      loadProducts();
    }
  };

  const handleDelete = (product: Product) => {
    Alert.alert('Delete Product', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        await deleteProduct(product.id, product.image_path);
        loadProducts();
      }},
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Product" onPress={() => { setEditing(null); setModalVisible(true); }} />
      <ProductList
        products={products}
        onSelect={product => { setEditing(product); setModalVisible(true); }}
        onDelete={handleDelete}
      />
      <Modal visible={modalVisible} animationType="slide">
        <ProductForm
          initial={editing || {}}
          onSubmit={editing ? handleEdit : handleAdd}
          submitLabel={editing ? 'Update' : 'Add'}
        />
        <Button title="Close" onPress={() => { setModalVisible(false); setEditing(null); }} />
      </Modal>
    </View>
  );
}
