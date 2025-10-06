// App.tsx - Complete Fixed Version
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";

// Interface Definition
interface MenuItem {
  id: number;
  dishName: string;
  description: string;
  course: "Starter" | "Main" | "Dessert";
  price: number;
  rating?: number;
}

// Main App Component
export default function App() {
  // State Variables
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, dishName: "Caesar Salad", description: "Fresh romaine lettuce with parmesan", course: "Starter", price: 85, rating: 4.5 },
    { id: 2, dishName: "Tomato Soup", description: "Creamy tomato soup with basil", course: "Starter", price: 65, rating: 4.2 },
    { id: 3, dishName: "Grilled Salmon", description: "Atlantic salmon with herbs", course: "Main", price: 195, rating: 4.8 },
    { id: 4, dishName: "Beef Steak", description: "Premium beef with vegetables", course: "Main", price: 220, rating: 4.7 },
    { id: 5, dishName: "Chocolate Cake", description: "Rich chocolate layer cake", course: "Dessert", price: 75, rating: 4.9 },
    { id: 6, dishName: "Ice Cream", description: "Vanilla ice cream with toppings", course: "Dessert", price: 55, rating: 4.3 },
  ]);

  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [nextId, setNextId] = useState<number>(7);

  // Form state
  const [newDishName, setNewDishName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourse, setNewCourse] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [newPrice, setNewPrice] = useState('');