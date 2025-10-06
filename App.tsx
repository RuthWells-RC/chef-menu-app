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

