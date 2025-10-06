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
