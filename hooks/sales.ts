import db from '../db/sqlite';
import { Sale } from '../types/db';

export async function recordSale(sale: Omit<Sale, 'id'>): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO sales (product_id, quantity, selling_price, date, profit)
         VALUES (?, ?, ?, ?, ?)`,
        [sale.product_id, sale.quantity, sale.selling_price, sale.date, sale.profit],
        () => resolve(),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function getSalesByDate(date: string): Promise<Sale[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM sales WHERE date = ?',
        [date],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}

export async function getProfitSummary(period: 'day' | 'week' | 'month'): Promise<number> {
  let query = '';
  if (period === 'day') {
    query = `SELECT SUM(profit) as total FROM sales WHERE date = date('now', 'localtime')`;
  } else if (period === 'week') {
    query = `SELECT SUM(profit) as total FROM sales WHERE strftime('%W', date) = strftime('%W', 'now', 'localtime')`;
  } else {
    query = `SELECT SUM(profit) as total FROM sales WHERE strftime('%m', date) = strftime('%m', 'now', 'localtime')`;
  }
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (_, { rows }) => resolve(rows.item(0)?.total || 0),
        (_, error) => { reject(error); return false; }
      );
    });
  });
}
