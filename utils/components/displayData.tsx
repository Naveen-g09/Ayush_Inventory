import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";

import { fetchData } from "@/utils/helpers/data";

interface Product {
  company_name: string;
  product_name: string;
  product_quantity: number;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    setRefreshing(true);
    const data = await fetchData("test_inventory");
    if (data) {
      setProducts(data);
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
    const interval = setInterval(() => {
      loadProducts();
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [loadProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Text style={styles.text}>{item.product_name}</Text>
      <Text style={styles.text}>{item.company_name}</Text>
      <Text style={styles.text}>{item.product_quantity}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadProducts} />
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
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