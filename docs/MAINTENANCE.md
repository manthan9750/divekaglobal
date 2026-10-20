# Divekaa Global — Store Maintenance Guide

This guide explains how to manage the store catalog and configuration without touching complex code.

## 1. How to Change a Price or Mark a Product "Out of Stock"
Open the file: `lib/data/products.ts`

Find the product you want to edit. Look for its block of code:
```typescript
{
  id: "prod_ginger_cardamom",
  name: "Ginger & Cardamom Jaggery Cubes",
  price: 249,             // <-- EDIT THIS NUMBER (Current selling price)
  originalPrice: 299,     // <-- EDIT THIS NUMBER (MRP, shown crossed out)
  isOutOfStock: false,    // <-- CHANGE TO true TO HIDE ADD-TO-CART BUTTON
  ...
}