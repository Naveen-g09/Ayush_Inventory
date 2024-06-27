import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import DataEntryComponent from "@/utils/components/dataEntry";
import ProductListScreen from "@/utils/components/displayData";

interface Item {
  name: string;
  quantity: number;
  type: string;
  count: number;
}

const initialNewItem: Item = { name: "", quantity: 0, type: "", count: 0 };

const TabOneScreen = () => {

  return (<>
  <ScrollView contentContainerStyle={styles.container}>
    <ProductListScreen />
  </ScrollView>
  <DataEntryComponent />
  </>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  columnHeader: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  countColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  countButton: {
    fontSize: 18,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  addButtonContainer: {
    alignItems: "flex-end",
    marginVertical: 16,
  },
  addButton: {
    fontSize: 24,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 50,
    padding: 10,
  },
});

export default TabOneScreen;
