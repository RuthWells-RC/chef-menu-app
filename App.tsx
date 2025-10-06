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
      
        {/* Average Prices by Course */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💰 Average Prices by Course</Text>
          {Object.entries(averages).map(([course, avg]) => (
            <View key={course} style={styles.averageRow}>
              <Text style={styles.courseText}>{course}</Text>
              <Text style={styles.priceText}>R{avg.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      
      {/* All Menu Items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 All Menu Items</Text>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.courseTag}>{item.course}</Text>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.menuItemFooter}>
                <Text style={styles.price}>R{item.price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMenuItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      
      {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToScreen('filter')}
          >
            <Text style={styles.navButtonText}>🔍 Filter by Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToScreen('ratings')}
          >
            <Text style={styles.navButtonText}>⭐ View Ratings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateToScreen('add')}
          >
            <Text style={styles.navButtonText}>➕ Add New Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  // Filter Screen - Filter items by course
  const renderFilterScreen = () => {
    const filtered = filterMenuItemsByCourse(selectedCourse);

    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>🔍 Filter Menu</Text>
      
      {/* Course Filter Buttons */}
        <View style={styles.filterButtons}>
          {['All', 'Starter', 'Main', 'Dessert'].map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.filterButton,
                selectedCourse === course && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCourse === course && styles.filterButtonTextActive,
                ]}
              >
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtered Results */}
        <Text style={styles.resultCount}>
          Showing {filtered.length} items
        </Text>

        {filtered.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.menuItemFooter}>
              <Text style={styles.courseTag}>{item.course}</Text>
              <Text style={styles.price}>R{item.price}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigateToScreen('home')}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

   // Ratings Screen - Show items sorted by rating
  const renderRatingsScreen = () => {
    const sortedItems = getItemsSortedByRating();

    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>⭐ Menu Ratings</Text>
        <Text style={styles.subtitle}>Sorted by highest rating</Text>

        {sortedItems.map((item) => {
          const rating = item.rating || 0;
          const stars = '⭐'.repeat(Math.floor(rating));

          return (
            <View key={item.id} style={styles.ratingCard}>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text style={styles.ratingText}>
                {rating.toFixed(1)} {stars}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.ratingFooter}>
                <Text style={styles.courseTag}>{item.course}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigateToScreen('home')}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
};
  
  // Add Item Screen - Form to add new menu items
  const renderAddItemScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>➕ Add New Menu Item</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            value={newDishName}
            onChangeText={setNewDishName}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Enter description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Select Course</Text>
          <View style={styles.courseButtons}>
            {(['Starter', 'Main', 'Dessert'] as const).map((course) => (
              <TouchableOpacity
                key={course}
                style={[
                  styles.courseButton,
                  newCourse === course && styles.courseButtonActive,
                ]}
                onPress={() => setNewCourse(course)}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    newCourse === course && styles.courseButtonTextActive,
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={newPrice}
            onChangeText={setNewPrice}
            placeholder="Enter price"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddMenuItem}
          >
            <Text style={styles.submitButtonText}>Add to Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigateToScreen('home')}
          >
            <Text style={styles.backButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};
  
// ============================================
  // MAIN RENDER - Screen Router
  // ============================================
  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'filter' && renderFilterScreen()}
      {currentScreen === 'ratings' && renderRatingsScreen()}
      {currentScreen === 'add' && renderAddItemScreen()}
    </SafeAreaView>
  );
}

// ============================================
// STYLES (Color Scheme and Layout)
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  screenContainer: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  courseText: {
    fontSize: 16,
    color: '#fff',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  menuItem: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  courseTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  navigationButtons: {
    marginTop: 24,
    marginBottom: 40,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterButtonTextActive: {
    fontWeight: 'bold',
  },
  resultCount: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingCard: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 8,
  },
  ratingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  form: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  courseButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  courseButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  courseButtonActive: {
    backgroundColor: '#4CAF50',
  },
  courseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  courseButtonTextActive: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
