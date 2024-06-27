import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

import { postData } from "../helpers/data";

const DataEntryComponent = () => {
  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleSubmit = async () => {
    const data = {
      company_name: companyName,
      product_name: productName,
      product_quantity: parseInt(productQuantity, 10),
    };

    await postData("test_inventory", data);
    Alert.alert("Success", "Data inserted successfully");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Quantity"
        keyboardType="numeric"
        value={productQuantity}
        onChangeText={setProductQuantity}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
});

export default DataEntryComponent;
