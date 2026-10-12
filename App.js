import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function App() {
  // State for form inputs
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // State for stored menu items
  const [menuItems, setMenuItems] = useState([]);

  // State for feedback messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle adding a menu item with validation
  const handleAddMenuItem = () => {
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // 1. Validation for required fields
    if (!dishName.trim() || !description.trim() || !course.trim() || !price.trim()) {
      setErrorMessage('All fields are required. Please fill in all details.');
      return;
    }

    // 2. Validate price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Please enter a valid positive number for the price.');
      return;
    }

    // 3. Create new menu item object
    const newItem = {
      id: Date.now().toString(),
      name: dishName,
      description: description,
      course: course,
      price: parsedPrice.toFixed(2),
    };

    // 4. Update state to automatically update the displayed list
    setMenuItems([...menuItems, newItem]);

    // 5. Success feedback & reset form
    setSuccessMessage(`Successfully added "${dishName}" to the menu!`);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Application Title */}
        <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
        <Text style={styles.subtitle}>First Working Version (Part 2)</Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add New Menu Item</Text>

          {/* Error Message */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Success Message */}
          {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Grilled Boerewors Roll"
            placeholderTextColor="#888"
            value={dishName}
            onChangeText={setDishName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., Served with chakalaka and crispy chips"
            placeholderTextColor="#888"
            multiline={true}
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Course (e.g., Starter, Main, Dessert)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Main"
            placeholderTextColor="#888"
            value={course}
            onChangeText={setCourse}
          />

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 120.00"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddMenuItem}>
            <Text style={styles.addButtonText}>Save Menu Item</Text>
          </TouchableOpacity>
        </View>

        {/* Display Menu Items Section */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Current Menu Items ({menuItems.length})</Text>

          {menuItems.length === 0 ? (
            <Text style={styles.emptyText}>No menu items have been added yet.</Text>
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardPrice}>R {item.price}</Text>
                  </View>
                  <Text style={styles.cardCourse}>Course: {item.course}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              )}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
    marginBottom: 15,
    color: '#2c3e50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    backgroundColor: '#fadbd8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  successText: {
    color: '#27ae60',
    backgroundColor: '#d4efdf',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 14,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#95a5a6',
    fontStyle: 'italic',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  cardCourse: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e67e22',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
