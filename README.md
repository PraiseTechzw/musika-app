
# Musika: Offline Shop Management App

Musika is an offline-first Expo React Native app designed for small shop owners to manage their inventory, track profits, and organize products. The app is strictly offline and does not require any internet connection.

## Features

- **Offline Only:** All features work without an internet connection. No data is sent or received online.
- **Product Management:** Add, edit, and delete products with fields for name, quantity, price, profit, and an optional image.
- **Image Upload:** Attach and preview images for each product, stored locally on the device.
- **Inventory & Profit Tracking:** View total stock and profit summaries at a glance.
- **Analytics:** (Coming soon) Visual summaries and trends for your shop.
- **Low Stock Reminders:** (Coming soon) Get notified when products are running low.
- **User-Friendly UI:** Simple navigation with tabs for Home, Products, Analytics, Reminders, and Explore.

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npx expo start
   ```
3. Use the Products tab to add and manage your shop's inventory. Attach images and track profit for each product.
4. Check the Analytics and Reminders tabs for future features.

## Project Structure

- `app/products/` — Product list and add/edit screens
- `app/analytics.tsx` — Analytics (future)
- `app/reminders.tsx` — Low stock reminders (future)
- `app/(tabs)/_layout.tsx` — Main tab navigation

## Requirements

- Expo Go or compatible Expo development environment
- No network connection required after installation

## Notes

- All data is stored locally on the device. No cloud or remote sync is used.
- This app is designed for simplicity and reliability for small business owners.
