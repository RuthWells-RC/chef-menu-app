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