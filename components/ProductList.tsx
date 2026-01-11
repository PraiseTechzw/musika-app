import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../types/db';

type Props = {
  products: Product[];
  onSelect: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductList({ products, onSelect, onDelete }: Props) {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelect(item)} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
          {item.image_path ? <Image source={{ uri: item.image_path }} style={{ width: 48, height: 48, marginRight: 12, borderRadius: 8 }} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text>Stock: {item.quantity}</Text>
            <Text>Buy: {item.buying_price} | Sell: {item.selling_price}</Text>
          </View>
          <TouchableOpacity onPress={() => onDelete(item)} style={{ marginLeft: 12 }}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}
