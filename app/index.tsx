import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import DataEntryComponent from "@/utils/components/dataEntry";
import ProductListScreen from "@/utils/components/displayData";

const TabOneScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <ProductListScreen />
      </View>
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
