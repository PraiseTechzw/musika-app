import * as FileSystem from 'expo-file-system';
import db from '../db/sqlite';
import { Product } from '../types/db';

export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products ORDER BY date_added DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function addProduct(product: Omit<Product, 'id'>, imageUri?: string): Promise<void> {
  let imagePath = product.image_path;
  if (imageUri) {
    const filename = imageUri.split('/').pop();
    const dest = FileSystem.documentDirectory + 'images/' + filename;
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images', { intermediates: true });
    await FileSystem.copyAsync({ from: imageUri, to: dest });
    imagePath = dest;
  }
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO products (name, category_id, buying_price, selling_price, quantity, image_path, date_added, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [product.name, product.category_id, product.buying_price, product.selling_price, product.quantity, imagePath, product.date_added, product.notes],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function updateProduct(product: Product, imageUri?: string): Promise<void> {
  let imagePath = product.image_path;
  if (imageUri) {
    const filename = imageUri.split('/').pop();
    const dest = FileSystem.documentDirectory + 'images/' + filename;
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images', { intermediates: true });
    await FileSystem.copyAsync({ from: imageUri, to: dest });
    imagePath = dest;
  }
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE products SET name=?, category_id=?, buying_price=?, selling_price=?, quantity=?, image_path=?, date_added=?, notes=? WHERE id=?`,
        [product.name, product.category_id, product.buying_price, product.selling_price, product.quantity, imagePath, product.date_added, product.notes, product.id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function deleteProduct(id: number, imagePath?: string): Promise<void> {
  if (imagePath) {
    try { await FileSystem.deleteAsync(imagePath, { idempotent: true }); } catch {}
  }
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM products WHERE id=?',
        [id],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}
