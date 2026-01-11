import db from '../db/sqlite';
import { Product } from '../types/db';

export async function restockProduct(productId: number, amount: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE products SET quantity = quantity + ? WHERE id = ?',
        [amount, productId],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function reduceStock(productId: number, amount: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT quantity FROM products WHERE id = ?',
        [productId],
        (_, { rows }) => {
          const current = rows.length > 0 ? rows.item(0).quantity : 0;
          if (current < amount) {
            resolve(false); // Not enough stock
            return;
          }
          tx.executeSql(
            'UPDATE products SET quantity = quantity - ? WHERE id = ?',
            [amount, productId],
            () => resolve(true),
            (_, error) => { reject(error); return false; }
          );
        },
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function getLowStockProducts(threshold: number = 5): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products WHERE quantity <= ?',
        [threshold],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}
