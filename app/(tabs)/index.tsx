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

interface Item {
  name: string;
  quantity: number;
  type: string;
  count: number;
}

const initialNewItem: Item = { name: "", quantity: 0, type: "", count: 0 };

const STORAGE_KEY = "@MyApp:items";

const ColumnHeaders = () => (
  <View style={styles.row}>
    <Text style={styles.columnHeader}>Name</Text>
    <Text style={styles.columnHeader}>Quantity</Text>
    <Text style={styles.columnHeader}>Type</Text>
    <Text style={styles.columnHeader}>Count</Text>
  </View>
);

const ItemRow = ({ item, onDelete }: { item: Item; onDelete: () => void }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${item.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: onDelete },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress}>
      <View style={styles.row}>
        <Text style={styles.column}>{item.name}</Text>
        <Text style={styles.column}>{quantity}</Text>
        <Text style={styles.column}>{item.type}</Text>
        <View style={styles.countColumn}>
          <TouchableOpacity onPress={handleDecrement}>
            <Text style={styles.countButton}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleIncrement}>
            <Text style={styles.countButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TabOneScreen = () => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>(initialNewItem);

  // Load data from AsyncStorage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  // Save data to AsyncStorage whenever data changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };

    saveData();
  }, [data]);

  const handleAddItem = () => {
    setData([...data, newItem]);
    setNewItem(initialNewItem);
  };

  const handleDeleteItem = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ColumnHeaders />
      {data.map((item, index) => (
        <ItemRow
          key={index}
          item={item}
          onDelete={() => handleDeleteItem(index)}
        />
      ))}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddItem}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newItem.name}
          onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={newItem.quantity.toString()}
          onChangeText={(text) =>
            setNewItem({ ...newItem, quantity: parseInt(text, 10) || 0 })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={newItem.type}
          onChangeText={(text) => setNewItem({ ...newItem, type: text })}
        />
      </View>
    </ScrollView>
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

export default TabOneScreen;
