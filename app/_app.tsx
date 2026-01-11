import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { initDb } from '../db/sqlite';

export default function App() {
  useEffect(() => {
    initDb();
  }, []);

  return <Slot />;
}
