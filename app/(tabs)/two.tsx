import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import call from 'react-native-phone-call';

interface Contact {
  name: string;
  phoneNumber: string;
}

const STORAGE_KEY = '@MyApp:contacts';

const CallScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>({ name: '', phoneNumber: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedContacts) {
          setContacts(JSON.parse(storedContacts));
        } else {
          setContacts([
            { name: 'Mankal', phoneNumber: '7021865475' },
            { name: 'Dr Mayank (Vaidyratnam)', phoneNumber: '8108577645' },
            { name: 'Rahul (Vaidyratnam)', phoneNumber: '9619691948' },
            { name: 'Vikas (Diabamass)', phoneNumber: '9509141510' },
            { name: 'Ashok (Upadhyay)', phoneNumber: '9892201884' },
            { name: 'Adinath Patil (Panchakarma)', phoneNumber: '7977082126' },
            { name: 'Sattapa Patil (Pathalogist)', phoneNumber: '9967064548' },
            { name: 'Dr Mahesh Pandey', phoneNumber: '9820006082' },
            { name: 'Arun Pandey', phoneNumber: '9820488824' },
            { name: 'Kamlakant', phoneNumber: '9819487935' },
            { name: 'Naveen', phoneNumber: '7208208480' },
          ]);
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };

    fetchData();
  }, []);

  const handleCallPress = (phoneNumber: string) => {
    const args = {
      number: phoneNumber,
      prompt: true,
    };

    call(args).catch(console.error);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phoneNumber) {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      setNewContact({ name: '', phoneNumber: '' });

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts))
        .then(() => console.log('Contact added successfully'))
        .catch((error) => console.error('Error saving contact:', error));
    } else {
      Alert.alert('Error', 'Please enter both name and phone number.');
    }
  };

  const handleLongPress = (index: number) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteContact(index),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteContact = (index: number) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts))
      .then(() => console.log('Contact deleted successfully'))
      .catch((error) => console.error('Error deleting contact:', error));
  };

  const renderItem = ({ item, index }: { item: Contact; index: number }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(index)}>
      <View style={styles.contactContainer}>
        <Text>{item.name}</Text>
        <Text>{item.phoneNumber}</Text>
        <TouchableOpacity onPress={() => handleCallPress(item.phoneNumber)}>
          <Text style={styles.callButton}>Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Screen</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        style={styles.flatList}
      />
      <View style={styles.addContactContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newContact.name}
          onChangeText={(text) => setNewContact({ ...newContact, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={newContact.phoneNumber}
          onChangeText={(text) => setNewContact({ ...newContact, phoneNumber: text })}
        />
        <TouchableOpacity onPress={handleAddContact}>
          <Text style={styles.addButton}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  flatList: {
    width: '100%',
    marginBottom: 16,
  },
  contactContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
  },
  name: {
    flex: 2,
  },
  phoneNumber: {
    flex: 2,
  },
  callButton: {
    color: 'blue',
    marginLeft: 8,
  },
  addContactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  addButton: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
  },
});

export default CallScreen;