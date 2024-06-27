import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { fetchData } from "@/utils/helpers/data"; // Adjust the import path as necessary

interface Product {
  company_name: string;
  product_name: string;
  product_quantity: number;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchData("test_inventory"); // Replace 'your_table_name' with the actual table name
      if (data) {
        setProducts(data);
      }
    };

    loadProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {products.map((product, index) => (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.text}>Company: {product.company_name}</Text>
          <Text style={styles.text}>Product: {product.product_name}</Text>
          <Text style={styles.text}>Quantity: {product.product_quantity}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default ProductListScreen;
