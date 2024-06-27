import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { supabase } from "@/utils/supabase";

type Item = {
  id?: string;
  company_name?: string;
  product_name: string;
  product_quantity: number;
};

const LessStock = () => {
  const [stock, setStock] = useState<Item[]>([]);

  useEffect(() => {
    const supabaseData = async () => {
      try {
        const { data: test_inventory, error } = await supabase
          .from("test_inventory")
          .select("*");
        if (error) {
          console.log("Error fetching data", error.message);
          return;
        }
        console.log("Fetched data", test_inventory);
        setStock(test_inventory);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    supabaseData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.serialText}>Serial: {item.id}</Text>
      <Text style={styles.productNameText}>
        Product Name: {item.product_name}
      </Text>
      <Text style={styles.quantityText}>Quantity: {item.product_quantity}</Text>
      <Text style={styles.companyNameText}>
        Company Name: {item.company_name}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={stock}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  serialText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 16,
    color: "#666",
  },
  companyNameText: {
    fontSize: 16,
    color: "#666",
  },
});

export default LessStock;
