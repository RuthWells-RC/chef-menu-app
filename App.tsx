const [currentScreen, setCurrentScreen] = useState<string>("home");
const [selectedCourse, setSelectedCourse] = useState<string>("All");
const [nextId, setNextId] = useState<number>(7);

// Form state for adding new items
const [newDishName, setNewDishName] = useState("");
const [newDescription, setNewDescription] = useState("");
const [newCourse, setNewCourse] = useState<"Starter" | "Main" | "Dessert">(
  "Starter"
);
const [newPrice, setNewPrice] = useState("");
const [newImageUrl, setNewImageUrl] = useState("");

// Calculate average price by course using FOR LOOP
const calculateAveragePriceByCourse = (): { [key: string]: number } => {
  const courseTotals: { [key: string]: { total: number; count: number } } = {};

  // Using FOR loop to iterate through menu items
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (!courseTotals[item.course]) {
      courseTotals[item.course] = { total: 0, count: 0 };
    }

    courseTotals[item.course].total += item.price;
    courseTotals[item.course].count += 1;
  }

  const averages: { [key: string]: number } = {};

  // Using FOR...IN loop to calculate averages
  for (const course in courseTotals) {
    averages[course] = courseTotals[course].total / courseTotals[course].count;
  }

  return averages;
};

// Get total number of menu items using WHILE LOOP
  const getTotalMenuItems = (): number => {
    let count = 0;
  let i = 0;
    
    / Using WHILE loop
    while (i < menuItems.length) {
      count++;
      i++;
    }

    return count;
  };

   // Filter menu items by course using FOR loop and IF statement
const filterMenuItemsByCourse = (course: string): MenuItem[] => {
  if (course === 'All') {
    return menuItems;
  }

  const filtered: MenuItem[] = [];

}

// Using FOR loop with IF statement
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].course === course) {
        filtered.push(menuItems[i]);
      }
}
    
 return filtered;
  };

  // Get items sorted by rating
  const getItemsSortedByRating = (): MenuItem[] => {
  const sortedItems = [...menuItems];
    
    // Bubble sort using FOR loops
    for (let i = 0; i < sortedItems.length - 1; i++) {
      for (let j = 0; j < sortedItems.length - i - 1; j++) {
        const rating1 = sortedItems[j].rating || 0;
        const rating2 = sortedItems[j + 1].rating || 0;

        if (rating1 < rating2) {
          const temp = sortedItems[j];
          sortedItems[j] = sortedItems[j + 1];
          sortedItems[j + 1] = temp;
        }
      }
    }

    return sortedItems;
  };

  // ============================================
  // BUTTON PRESS HANDLERS (Handle Button Presses)
  // ============================================

  // Add new menu item (Handle text inputs)
  const handleAddMenuItem = () => {
    if (!newDishName || !newDescription || !newPrice) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const newItem: MenuItem = {
      id: nextId,
      dishName: newDishName,
      description: newDescription,
      course: newCourse,
      price: priceNum,
      rating: 0,
    };

    setMenuItems([...menuItems, newItem]);
    setNextId(nextId + 1);

    // Clear form
    setNewDishName('');
    setNewDescription('');
    setNewPrice('');

    Alert.alert('Success', `${newDishName} added to menu!`);
    setCurrentScreen('home');
};
  
// Clear form
    setNewDishName('');
    setNewDescription('');
    setNewPrice('');

    Alert.alert('Success', `${newDishName} added to menu!`);
    setCurrentScreen('home');
  };

  // Remove menu item
  const handleRemoveMenuItem = (id: number) => {
    const item = menuItems.find(item => item.id === id);
    if (item) {
      Alert.alert(
        'Confirm Remove',
        `Remove "${item.dishName}" from menu?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              setMenuItems(menuItems.filter(item => item.id !== id));
            },
          },
        ]
      );
    }
};
  
 // Navigate to screen (Screen Navigation)
  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
  };
/ ============================================
  // RENDER FUNCTIONS FOR EACH SCREEN
  // ============================================

  // Home Screen - Shows menu with averages
  const renderHomeScreen = () => {
    const averages = calculateAveragePriceByCourse();
    const totalItems = getTotalMenuItems();

    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>🍽️ Christoffel's Menu</Text>
        <Text style={styles.subtitle}>Private Chef Experience</Text>

{/* Total Items */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Total Menu Items</Text>
          <Text style={styles.statsNumber}>{totalItems}</Text>
        </View>