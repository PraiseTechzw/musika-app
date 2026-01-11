import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Product } from '../types/db';

type Props = {
  initial?: Partial<Product>;
  onSubmit: (product: Omit<Product, 'id'>, imageUri?: string) => void;
  submitLabel?: string;
};

export default function ProductForm({ initial = {}, onSubmit, submitLabel = 'Save' }: Props) {
  const [name, setName] = useState(initial.name || '');
  const [buyingPrice, setBuyingPrice] = useState(initial.buying_price?.toString() || '');
  const [sellingPrice, setSellingPrice] = useState(initial.selling_price?.toString() || '');
  const [quantity, setQuantity] = useState(initial.quantity?.toString() || '');
  const [notes, setNotes] = useState(initial.notes || '');
  const [imageUri, setImageUri] = useState<string | undefined>(initial.image_path);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !buyingPrice || !sellingPrice || !quantity) return;
    onSubmit({
      name,
      category_id: null,
      buying_price: parseFloat(buyingPrice),
      selling_price: parseFloat(sellingPrice),
      quantity: parseInt(quantity, 10),
      image_path: imageUri,
      date_added: initial.date_added || new Date().toISOString(),
      notes,
    }, imageUri);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text>Buying Price</Text>
      <TextInput value={buyingPrice} onChangeText={setBuyingPrice} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text>Selling Price</Text>
      <TextInput value={sellingPrice} onChangeText={setSellingPrice} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text>Quantity</Text>
      <TextInput value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      <Text>Notes</Text>
      <TextInput value={notes} onChangeText={setNotes} style={{ borderWidth: 1, marginBottom: 8, padding: 8 }} />
      {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginBottom: 8 }} /> : null}
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <TouchableOpacity onPress={pickImage} style={{ marginRight: 16 }}>
          <Text style={{ color: 'blue' }}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text style={{ color: 'blue' }}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <Button title={submitLabel} onPress={handleSubmit} />
    </View>
  );
}
