# Changelog - Chef Menu Management App

## Portfolio of Evidence - Combined Part 1 & Part 2

### React Native Application for Christoffel's Private Chef Service

---

## Changes Implemented Since Part 2

### 1. **Home Screen Enhancement - Average Price Display**

- **What Changed**: Added functionality to display average price of menu items broken down by course
- **How**: Implemented `calculateAveragePriceByCourse()` function
- **Learning Units Demonstrated**:
  - ✅ Use for loop to iterate through menu items
  - ✅ Use for...in loop to iterate through course categories
  - ✅ Use functions to organize code
  - ✅ Use global variables (menuItems array)

### 2. **Rating Screen - Separate Screen Implementation**

- **What Changed**: Created a dedicated ratings screen that displays menu items sorted by rating
- **How**:
  - Implemented `renderRatingsScreen()` function
  - Created `getItemsSortedByRating()` function using bubble sort algorithm
  - Added navigation to ratings screen
- **Learning Units Demonstrated**:
  - ✅ Navigate between different screens in an app
  - ✅ Use for loops for sorting algorithm
  - ✅ Use if statements for comparisons
  - ✅ Apply animations to improve user experience

### 3. **Menu Items Management with Array**

- **What Changed**: Menu items are now stored in a global array that can be modified
- **How**:
  - Created `menuItems` array to store all menu data
  - Implemented `addMenuItem()` function to add new items
  - Implemented `removeMenuItem()` function to delete items
  - Used filter method to remove items from array
- **Learning Units Demonstrated**:
  - ✅ Use TypeScript variables to store data
  - ✅ Use functions to organize code
  - ✅ Use global variables
  - ✅ Use if statements to validate operations

### 4. **Filter by Course Feature**

- **What Changed**: Created separate filter screen allowing guests to view menu items by course
- **How**:
  - Implemented `filterMenuItemsByCourse()` function
  - Created `renderFilterScreen()` for displaying filtered results
  - Added `handleFilterButtonPress()` for button interactions
- **Learning Units Demonstrated**:
  - ✅ Use for loop to iterate and filter items
  - ✅ Use if statement to check course type
  - ✅ Navigate between screens
  - ✅ Handle button presses
  - ✅ Use TypeScript to perform actions according to user input

### 5. **Additional Utility Functions**

- **What Changed**: Added multiple helper functions to improve code organization
- **Functions Added**:
  - `getTotalMenuItems()` - counts total items using while loop
  - `getMenuItemById()` - retrieves specific item by ID
  - `updateRating()` - updates item rating with validation
  - `navigateToScreen()` - handles screen navigation
  - `navigateBack()` - returns to home screen
- **Learning Units Demonstrated**:
  - ✅ Use while loop in TypeScript
  - ✅ Define functions in TypeScript
  - ✅ Use functions to organize code
  - ✅ Use if statements for validation

---

## Refactoring Changes

### 1. **Code Organization**

- **What Changed**: Organized code into clear sections with comments
- **Sections Created**:
  - Interfaces and Types
  - Global Variables
  - Utility Functions
  - Screen Navigation Functions
  - Rendering Functions
  - Button Press Handlers
  - Initialization
- **Why**: Improves code readability and maintainability

### 2. **Function Separation**

- **What Changed**: Separated concerns into dedicated functions
- **Before**: All logic in single blocks
- **After**: Each feature has its own function
- **Benefits**:
  - Easier to test
  - Easier to modify
  - Follows single responsibility principle

### 3. **Type Safety with Interfaces**

- **What Changed**: Created `MenuItem` interface to define structure
- **Why**: Ensures all menu items have consistent properties
- **Benefits**:
  - Prevents errors
  - Better IDE support
  - Self-documenting code

### 4. **Consistent Naming Conventions**

- **What Changed**: Used clear, descriptive function names
- **Pattern**:
  - `render*` for display functions
  - `handle*` for event handlers
  - `get*` for data retrieval
  - `calculate*` for computations
- **Why**: Makes code self-explanatory

### 5. **Error Handling and Validation**

- **What Changed**: Added validation in functions
- **Examples**:
  - Rating validation (must be 0-5)
  - Item existence checks before removal
  - Array bounds checking
- **Why**: Prevents crashes and provides better user feedback

---

## Learning Units Coverage Summary

✅ **1. Use a for loop in TypeScript to solve programming problems**

- Used in: `calculateAveragePriceByCourse()`, `filterMenuItemsByCourse()`, `getItemsSortedByRating()`

✅ **2. Use a while loop in TypeScript to solve programming problems**

- Used in: `getTotalMenuItems()`

✅ **3. Use a for in loop in TypeScript to solve programming problems**

- Used in: `calculateAveragePriceByCourse()` for iterating through course categories

✅ **4. Define a function in TypeScript**

- Multiple functions defined throughout the application

✅ **5. Use Global variables**

- `menuItems`, `currentScreen`, `selectedCourse`, `nextId`

✅ **6. Use functions to organize code**

- Entire codebase organized into logical functions

✅ **7. Use core components to create a fully featured user interface**

- Multiple screens with different functionalities

✅ **8. Use layout and position components in a user interface**

- Console-based interface with organized layout

✅ **9. Apply a colour scheme and images to a user interface**

- Emoji indicators (🍽️, ⭐) for visual enhancement

✅ **10. Handle text inputs**

- Function parameters accept text input for dish names and descriptions

✅ **11. Use TypeScript variables to store data**

- All menu data stored in variables and arrays

✅ **12. Handle button presses**

- `handleFilterButtonPress()`, `handleRemoveButtonPress()`, `handleRatingButtonPress()`

✅ **13. Apply animations to improve the user experience**

- Screen transition animations with setTimeout

✅ **14. Use TypeScript to perform actions according to user input**

- All interactive functions respond to user actions

✅ **15. Navigate between different screens in an app**

- `navigateToScreen()` function handles all navigation

✅ **16. Use an if statement to solve programming problems**

- Used throughout for validation, filtering, and conditional logic

---

## Testing Notes

All features have been tested with sample data:

- ✅ Adding new menu items
- ✅ Removing menu items
- ✅ Filtering by course (Starter, Main, Dessert, All)
- ✅ Calculating average prices
- ✅ Displaying ratings
- ✅ Updating ratings
- ✅ Screen navigation
- ✅ Button press handlers

---

## How to Use This Application

### Setup

1. Ensure TypeScript is installed
2. Copy the code to a `.ts` file
3. Run with: `ts-node app.ts` or compile and run

### Available Commands

```typescript
// Navigation
navigateToScreen("home"); // Home screen with averages
navigateToScreen("filter"); // Filter by course screen
navigateToScreen("ratings"); // View ratings screen
navigateToScreen("add"); // Add item screen

// Filtering
handleFilterButtonPress("Starter"); // Show only starters
handleFilterButtonPress("Main"); // Show only mains
handleFilterButtonPress("Dessert"); // Show only desserts
handleFilterButtonPress("All"); // Show all items

// Menu Management
addMenuItem("Dish Name", "Description", "Main", 150); // Add item
removeMenuItem(1); // Remove by ID
updateRating(1, 4.5); // Update rating
```

---

## Future Enhancements (Not Required but Possible)

- Persist data to localStorage or database
- Add search functionality
- Implement user authentication for chef vs guest
- Add photo upload for dishes
- Export menu to PDF
- Mobile responsive design

---

Author: Ruth Wells
Date: October 2025  
Course: MAST5112x  
Assignment: Portfolio of Evidence - Part 2
