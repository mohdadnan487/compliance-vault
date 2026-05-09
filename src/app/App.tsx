import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Divider,
  alpha,
  InputAdornment,
  Tabs,
  Tab,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  LinearProgress,
  Drawer,
  Paper,
  Switch,
  FormControlLabel,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  CheckCircle,
  AlertCircle,
  Calendar,
  Plus,
  Star,
  AlertTriangle,
  Shield,
  X,
  TrendingUp,
  Clock,
  Search,
  Thermometer,
  Utensils,
  Users,
  Wrench,
  FileText,
  DollarSign,
  Recycle,
  Lock,
  Flame,
  Zap,
  ClipboardList,
  LogOut,
  Upload,
  Download,
  Bell,
  MapPin,
  Bot,
  Camera,
  Mail,
  Phone,
  ExternalLink,
  History,
  BarChart3,
  Settings,
  Paperclip,
  Send,
  Menu as MenuIcon,
  ChevronDown,
  Leaf,
  Droplet,
  Wind,
  Package,
  BookOpen,
  Award,
  Target,
  Activity,
  TrendingDown,
  Database,
  Wifi,
  WifiOff,
  RefreshCw,
  Filter,
  Edit,
  CheckSquare,
  XCircle,
  Lightbulb,
  Share2,
  Globe,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

// Initial Data with all new features
const initialData = {
  // Original Compliance Records
  licences: [
    {
      id: 1,
      title: "Premises Licence",
      authority: "City of London Licensing",
      licenceNo: "CL-2019-00473",
      issued: "2019-04-01",
      expiry: "2029-04-01",
      status: "active",
      category: "Alcohol & Entertainment",
      notes: "Full on/off licence. Hours: Mon–Sat 10:00–23:00, Sun 12:00–22:30",
      location: "Main Location",
      documents: [],
    },
    {
      id: 2,
      title: "Personal Licence",
      authority: "London Borough of Southwark",
      licenceNo: "PL-SW-00891",
      issued: "2020-01-15",
      expiry: "2030-01-15",
      status: "active",
      category: "Alcohol & Entertainment",
      notes: "Holder: Sarah Mitchell. DBS checked. Designated Premises Supervisor.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 3,
      title: "Music & Entertainment Licence",
      authority: "City of London Licensing",
      licenceNo: "CL-ENT-2022-0114",
      issued: "2022-03-10",
      expiry: "2025-03-10",
      status: "expired",
      category: "Entertainment",
      notes: "Renewal application submitted 01 Feb 2025.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 4,
      title: "Outdoor Seating Licence",
      authority: "Westminster City Council",
      licenceNo: "WCC-OUT-44821",
      issued: "2023-05-01",
      expiry: "2025-05-01",
      status: "due-soon",
      category: "Premises",
      notes: "Covers 8 tables on the pavement area.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 5,
      title: "Late Night Refreshment",
      authority: "Metropolitan Police Licensing",
      licenceNo: "LNR-MET-3302",
      issued: "2021-09-01",
      expiry: "2031-09-01",
      status: "active",
      category: "Food & Drink",
      notes: "Permitted until 01:00 Fri & Sat.",
      location: "Main Location",
      documents: [],
    },
  ],

  certifications: [
    {
      id: 1,
      title: "Gas Safety Certificate",
      supplier: "London Gas Services Ltd",
      certNo: "GAS-2025-0145",
      lastService: "2025-01-15",
      nextDue: "2026-01-15",
      status: "compliant",
      category: "Gas Safety",
      notes: "All appliances tested and certified safe. Includes: 2x ovens, 1x grill, 1x fryer.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 2,
      title: "Electrical Installation Certificate",
      supplier: "SafeSpark Electrical",
      certNo: "EIC-2024-8832",
      lastService: "2024-03-20",
      nextDue: "2029-03-20",
      status: "compliant",
      category: "Electrical Safety",
      notes: "5-year certification. All circuits tested and compliant.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 3,
      title: "Fire Safety Risk Assessment",
      supplier: "Fire Safety Consultants Ltd",
      certNo: "FSRA-2024-1156",
      lastService: "2024-06-10",
      nextDue: "2025-06-10",
      status: "due-soon",
      category: "Fire Safety",
      notes: "Annual review required. No major issues found.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 4,
      title: "PAT Testing Certificate",
      supplier: "SafeSpark Electrical",
      certNo: "PAT-2024-3345",
      lastService: "2024-09-15",
      nextDue: "2025-09-15",
      status: "compliant",
      category: "Electrical Safety",
      notes: "45 appliances tested. 2 items failed and replaced.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 5,
      title: "Kitchen Extraction Cleaning (TR/19)",
      supplier: "Clean Air Systems",
      certNo: "TR19-2024-0891",
      lastService: "2024-11-20",
      nextDue: "2025-05-20",
      status: "due-soon",
      category: "Equipment Maintenance",
      notes: "6-monthly deep clean required for insurance compliance.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 6,
      title: "Fire Extinguisher Annual Service",
      supplier: "Fire Safety Direct",
      certNo: "FES-2024-5567",
      lastService: "2024-03-10",
      nextDue: "2025-03-10",
      status: "expired",
      category: "Fire Safety",
      notes: "8x extinguishers serviced. Overdue for renewal.",
      location: "Main Location",
      documents: [],
    },
  ],

  insurance: [
    {
      id: 1,
      title: "Public Liability Insurance",
      provider: "AXA Commercial",
      policyNo: "PL-8829-2024",
      issued: "2024-04-01",
      expiry: "2025-04-01",
      status: "due-soon",
      category: "Insurance",
      notes: "£5 million cover. Renewal due next month.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 2,
      title: "Employer's Liability Insurance",
      provider: "AXA Commercial",
      policyNo: "EL-8830-2024",
      issued: "2024-04-01",
      expiry: "2025-04-01",
      status: "due-soon",
      category: "Insurance",
      notes: "£10 million cover. Legally required.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 3,
      title: "Building & Contents Insurance",
      provider: "Aviva Business",
      policyNo: "BC-4472-2024",
      issued: "2024-01-01",
      expiry: "2026-01-01",
      status: "active",
      category: "Insurance",
      notes: "Covers building, equipment, and stock up to £500,000.",
      location: "Main Location",
      documents: [],
    },
  ],

  environmental: [
    {
      id: 1,
      title: "Waste Transfer Notes",
      supplier: "London Waste Services",
      contractNo: "WCS-2024-8871",
      contractStart: "2024-01-01",
      contractEnd: "2026-01-01",
      status: "active",
      category: "Waste Management",
      notes: "General waste and recycling collection 3x weekly. License: WML-45629.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 2,
      title: "Cooking Oil Disposal",
      supplier: "Oil Recycle UK",
      contractNo: "OIL-2024-3304",
      contractStart: "2024-03-01",
      contractEnd: "2025-03-01",
      status: "due-soon",
      category: "Waste Management",
      notes: "Monthly collection. 240L bin. Contract renewal needed.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 3,
      title: "Grease Trap Servicing",
      supplier: "Drain Clear Pro",
      contractNo: "GT-2024-1198",
      contractStart: "2024-02-15",
      contractEnd: "2025-02-15",
      status: "active",
      category: "Environmental",
      notes: "Quarterly cleaning and maintenance. Thames Water compliant.",
      location: "Main Location",
      documents: [],
    },
  ],

  operational: [
    {
      id: 1,
      title: "Pest Control Contract",
      supplier: "Rentokil",
      frequency: "Monthly",
      lastVisit: "2025-04-20",
      nextVisit: "2025-05-20",
      status: "compliant",
      category: "Pest Control",
      notes: "No evidence of pest activity. Bait stations checked and maintained.",
      location: "Main Location",
      documents: [],
    },
    {
      id: 2,
      title: "Water Quality Testing",
      supplier: "H2O Analysis Ltd",
      frequency: "Quarterly",
      lastVisit: "2025-02-10",
      nextVisit: "2025-05-10",
      status: "compliant",
      category: "Health & Safety",
      notes: "Legionella risk assessment clear. All tests passed.",
      location: "Main Location",
      documents: [],
    },
  ],
  // Temperature Monitoring
  temperatures: [
    { id: 1, equipment: "Walk-in Fridge", location: "Main Kitchen", current: 3.2, min: 0, max: 5, status: "normal", lastReading: "2025-05-07 14:30", sensor: "BT-001" },
    { id: 2, equipment: "Chest Freezer", location: "Main Kitchen", current: -18.5, min: -20, max: -15, status: "normal", lastReading: "2025-05-07 14:30", sensor: "BT-002" },
    { id: 3, equipment: "Display Fridge", location: "Front Counter", current: 7.8, min: 0, max: 5, status: "alert", lastReading: "2025-05-07 14:28", sensor: "BT-003" },
    { id: 4, equipment: "Hot Holding Cabinet", location: "Main Kitchen", current: 68, min: 63, max: 80, status: "normal", lastReading: "2025-05-07 14:30", sensor: "BT-004" },
  ],

  // Digital Checklists
  checklists: [
    { id: 1, title: "Opening Checklist", type: "opening", frequency: "daily", tasks: 12, completed: 12, assignedTo: "James Hargreaves", status: "completed", dueTime: "09:00", completedAt: "2025-05-07 08:45" },
    { id: 2, title: "Deep Clean - Kitchen", type: "cleaning", frequency: "weekly", tasks: 25, completed: 18, assignedTo: "Sarah Mitchell", status: "in-progress", dueTime: "17:00", completedAt: null },
    { id: 3, title: "Closing Checklist", type: "closing", frequency: "daily", tasks: 15, completed: 0, assignedTo: "David Chen", status: "pending", dueTime: "23:00", completedAt: null },
  ],

  // HACCP Plans
  haccp: [
    { id: 1, title: "Cold Food Storage HACCP", category: "Storage", ccps: 2, status: "active", lastReview: "2025-04-01", nextReview: "2025-07-01", createdBy: "AI Generated" },
    { id: 2, title: "Hot Food Preparation HACCP", category: "Preparation", ccps: 3, status: "active", lastReview: "2025-03-15", nextReview: "2025-06-15", createdBy: "Sarah Mitchell" },
  ],

  // Staff Training
  training: [
    { id: 1, name: "James Hargreaves", role: "Head Chef", level2: "2023-06-15", level2Expiry: "2026-06-15", level3: "2024-01-10", level3Expiry: "2027-01-10", allergen: "2024-09-20", allergenExpiry: "2025-09-20", firstAid: "2024-03-15", firstAidExpiry: "2027-03-15", status: "compliant" },
    { id: 2, name: "Sarah Mitchell", role: "Manager", level2: "2022-11-20", level2Expiry: "2025-11-20", level3: "2023-05-10", level3Expiry: "2026-05-10", allergen: "2025-01-15", allergenExpiry: "2026-01-15", firstAid: "2023-08-22", firstAidExpiry: "2026-08-22", status: "compliant" },
    { id: 3, name: "David Chen", role: "Sous Chef", level2: "2024-02-10", level2Expiry: "2027-02-10", allergen: "2024-11-05", allergenExpiry: "2025-11-05", firstAid: null, status: "due-soon" },
  ],

  // Allergen Management
  allergens: {
    menu: [
      { id: 1, dish: "Chicken Tikka Masala", allergens: ["Dairy", "Mustard"], ingredients: ["Chicken", "Yogurt", "Cream", "Mustard Seeds", "Tomatoes", "Spices"], category: "Main Course", natashasLaw: true, ppds: "Contains: Milk, Mustard" },
      { id: 2, dish: "Fish & Chips", allergens: ["Fish", "Gluten", "Eggs"], ingredients: ["Cod", "Potatoes", "Flour", "Beer", "Eggs"], category: "Main Course", natashasLaw: false, ppds: null },
      { id: 3, dish: "Vegan Buddha Bowl", allergens: ["Sesame", "Nuts"], ingredients: ["Quinoa", "Chickpeas", "Tahini", "Cashews", "Vegetables"], category: "Main Course", natashasLaw: false, ppds: null },
    ],
    customerRequests: [
      { id: 1, date: "2025-05-07", customer: "Table 12", request: "Severe nut allergy", dish: "Vegan Buddha Bowl", action: "Modified - removed cashews and tahini", handledBy: "James Hargreaves" },
    ]
  },

  // Supplier Management
  suppliers: [
    { id: 1, name: "Fresh Foods Ltd", category: "Produce", status: "approved", lastAudit: "2024-11-15", nextAudit: "2025-11-15", documents: 5, rating: 4.5, contact: "supplier@freshfoods.co.uk", phone: "020 7123 4567" },
    { id: 2, name: "Premium Meats Co", category: "Meat & Poultry", status: "approved", lastAudit: "2025-01-20", nextAudit: "2026-01-20", documents: 7, rating: 5.0, contact: "orders@premiummeats.co.uk", phone: "020 8765 4321" },
    { id: 3, name: "Ocean Catch Seafood", category: "Seafood", status: "pending", lastAudit: null, nextAudit: "2025-06-01", documents: 2, rating: null, contact: "info@oceancatch.co.uk", phone: "020 7555 8888" },
  ],

  // Incidents & Complaints
  incidents: [
    { id: 1, date: "2025-05-05", type: "Customer Complaint", severity: "medium", description: "Food too cold", status: "resolved", assignedTo: "Sarah Mitchell", resolution: "Retrained staff on hot holding temperatures" },
    { id: 2, date: "2025-05-03", type: "Near Miss", severity: "low", description: "Wet floor without signage", status: "resolved", assignedTo: "David Chen", resolution: "Installed permanent wet floor signs" },
    { id: 3, date: "2025-05-07", type: "Food Safety Incident", severity: "high", description: "Temperature excursion in display fridge", status: "investigating", assignedTo: "James Hargreaves", resolution: null },
  ],

  // Equipment Maintenance
  equipment: [
    { id: 1, name: "Commercial Oven", manufacturer: "Rational", model: "SCC 101", serial: "RAT-2019-4457", location: "Main Kitchen", lastService: "2025-03-15", nextService: "2025-09-15", warranty: "2026-06-30", status: "compliant" },
    { id: 2, name: "Walk-in Fridge Compressor", manufacturer: "Williams", model: "WBC-500", serial: "WIL-2020-8821", location: "Main Kitchen", lastService: "2024-11-20", nextService: "2025-05-20", warranty: "2025-11-20", status: "due-soon" },
  ],

  // Recipes & Menu
  recipes: [
    { id: 1, name: "Chicken Tikka Masala", category: "Main Course", servings: 4, prepTime: 30, cookTime: 45, allergens: ["Dairy", "Mustard"], nutrition: { calories: 420, protein: 32, carbs: 18, fat: 24 }, cost: 3.50, sellPrice: 14.95, margin: 76.6 },
    { id: 2, name: "Fish & Chips", category: "Main Course", servings: 1, prepTime: 15, cookTime: 20, allergens: ["Fish", "Gluten", "Eggs"], nutrition: { calories: 850, protein: 38, carbs: 92, fat: 35 }, cost: 4.20, sellPrice: 12.95, margin: 67.6 },
  ],

  // Integrations
  integrations: [
    { id: 1, name: "Xero Accounting", type: "accounting", status: "connected", lastSync: "2025-05-07 14:00", icon: "💼" },
    { id: 2, name: "Square POS", type: "pos", status: "connected", lastSync: "2025-05-07 14:25", icon: "💳" },
    { id: 3, name: "Deliveroo", type: "delivery", status: "disconnected", lastSync: null, icon: "🛵" },
    { id: 4, name: "Deputy Scheduling", type: "hr", status: "pending", lastSync: null, icon: "👥" },
  ],

  // Traceability & Recall
  traceability: [
    { id: 1, product: "Scottish Salmon Fillets", batch: "SS-2025-0145", supplier: "Ocean Catch Seafood", received: "2025-05-05", expiry: "2025-05-12", quantity: "15kg", usedIn: ["Fish & Chips"], status: "active" },
    { id: 2, product: "Free Range Chicken Breast", batch: "CH-2025-0892", supplier: "Premium Meats Co", received: "2025-05-06", expiry: "2025-05-13", quantity: "25kg", usedIn: ["Chicken Tikka Masala"], status: "active" },
  ],

  // Sustainability Tracking
  sustainability: {
    carbon: { monthly: 2.4, target: 2.0, unit: "tonnes CO2e", trend: -8.5 },
    energy: { monthly: 1850, target: 1600, unit: "kWh", trend: -5.2 },
    water: { monthly: 45, target: 40, unit: "m³", trend: -3.1 },
    waste: { monthly: 180, recycled: 120, unit: "kg", recyclingRate: 66.7 },
    localSourcing: { percentage: 45, suppliers: 12, target: 60 },
  },

  // White Label Settings
  whiteLabel: {
    brandName: "ComplianceVault Pro",
    logo: null,
    primaryColor: "#1976d2",
    secondaryColor: "#dc004e",
    companyName: "Your Restaurant Group",
    locations: 3,
  },
};

const allergensList = [
  "Cereals containing gluten",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Peanuts",
  "Soybeans",
  "Milk",
  "Nuts",
  "Celery",
  "Mustard",
  "Sesame",
  "Sulphites",
  "Lupin",
  "Molluscs",
];

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function calculateComplianceScore(data: any) {
  let score = 100;

  // Temperature compliance
  const tempAlerts = data.temperatures.filter((t: any) => t.status === "alert").length;
  score -= tempAlerts * 5;

  // Checklist completion
  const incompleteLists = data.checklists.filter((c: any) => c.status !== "completed").length;
  score -= incompleteLists * 3;

  // Training compliance
  const trainingIssues = data.training.filter((t: any) => t.status !== "compliant").length;
  score -= trainingIssues * 8;

  // Incidents
  const openIncidents = data.incidents.filter((i: any) => i.status !== "resolved").length;
  score -= openIncidents * 10;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function getComplianceColor(score: number) {
  if (score >= 90) return "#10b981";
  if (score >= 70) return "#f59e0b";
  return "#ef4444";
}

// Temperature Monitor Component
function TemperatureMonitor({ temperatures, onRefresh, onAddEquipment, onRecordReading }: any) {
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Live Temperature Monitoring
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "auto auto auto" }, gap: 1 }}>
          <Button size="small" variant="outlined" startIcon={<Plus size={14} />} onClick={onAddEquipment} sx={{ whiteSpace: "nowrap", minWidth: 0, px: 1 }}>
            Add
          </Button>
          <Button size="small" variant="contained" startIcon={<Thermometer size={14} />} onClick={onRecordReading} sx={{ whiteSpace: "nowrap", minWidth: 0, px: 1 }}>
            Record
          </Button>
          <Button size="small" startIcon={<RefreshCw size={14} />} onClick={onRefresh} sx={{ whiteSpace: "nowrap", minWidth: 0, px: 1 }}>
            Refresh
          </Button>
        </Box>
      </Box>
      <Stack spacing={3}>
        {temperatures.map((temp: any) => (
          <Card key={temp.id} sx={{ boxShadow: "none", border: `1px solid ${temp.status === "alert" ? alpha("#ef4444", 0.3) : alpha("#10b981", 0.2)}`, bgcolor: temp.status === "alert" ? alpha("#ef4444", 0.02) : alpha("#10b981", 0.01) }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem", mb: 0.5 }}>
                    {temp.equipment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                    {temp.location} • Sensor: {temp.sensor}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: temp.status === "alert" ? "#ef4444" : "#10b981", fontSize: "2rem" }}>
                    {temp.current}°C
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", mt: 0.5 }}>
                    Range: {temp.min}°C - {temp.max}°C
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((temp.current - temp.min) / (temp.max - temp.min)) * 100}
                sx={{ height: 8, borderRadius: 4, bgcolor: alpha(temp.status === "alert" ? "#ef4444" : "#10b981", 0.08), "& .MuiLinearProgress-bar": { bgcolor: temp.status === "alert" ? "#ef4444" : "#10b981", borderRadius: 4 } }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontSize: "0.8125rem" }}>
                Last reading: {temp.lastReading}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

// AI HACCP Generator
function AIHACCPGenerator({ onGenerate }: any) {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [foodCategories, setFoodCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const steps = ["Business Type", "Food Categories", "Review", "Generate"];

  const FOOD_CATEGORY_OPTIONS = [
    "Raw meat / poultry",
    "Raw fish / seafood",
    "Dairy products",
    "Eggs",
    "Cooked / hot food",
    "Cold prepared food",
    "Bakery / pastry",
    "Beverages (incl. alcohol)",
    "Frozen foods",
    "Allergen-controlled menu",
  ];

  const toggleCategory = (cat: string) => {
    setFoodCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await callAI({
        mode: "haccp",
        businessType,
        foodCategories,
      });
      setGeneratedPlan(result);
      if (onGenerate) onGenerate(result);
    } catch (e: any) {
      setError(e?.message || "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setBusinessType("");
    setFoodCategories([]);
    setGeneratedPlan(null);
    setError(null);
  };

  // Show generated plan view
  if (generatedPlan) {
    return (
      <Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Generated HACCP Plan
          </Typography>
          <Button variant="outlined" startIcon={<RefreshCw size={16} />} onClick={reset}>
            Generate New Plan
          </Button>
        </Box>
        <Paper sx={{ p: { xs: 2, sm: 3 }, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
          {generatedPlan.raw ? (
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.8rem" }}>
              {generatedPlan.raw}
            </Typography>
          ) : (
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {generatedPlan.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {generatedPlan.summary}
                </Typography>
              </Box>

              {generatedPlan.criticalControlPoints?.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Critical Control Points
                  </Typography>
                  <Stack spacing={2}>
                    {generatedPlan.criticalControlPoints.map((ccp: any, idx: number) => (
                      <Card key={idx} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: "primary.main" }}>
                            CCP {idx + 1}: {ccp.name}
                          </Typography>
                          <Stack spacing={1}>
                            {[
                              ["Hazard", ccp.hazard],
                              ["Critical Limit", ccp.criticalLimit],
                              ["Monitoring", ccp.monitoring],
                              ["Corrective Action", ccp.correctiveAction],
                              ["Verification", ccp.verification],
                              ["Records", ccp.records],
                            ].map(([label, val]) =>
                              val ? (
                                <Box key={label}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary", display: "block" }}>
                                    {label}
                                  </Typography>
                                  <Typography variant="body2">{val}</Typography>
                                </Box>
                              ) : null
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              )}

              {generatedPlan.prerequisites?.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Prerequisite Programmes
                  </Typography>
                  <Stack spacing={1}>
                    {generatedPlan.prerequisites.map((p: string, idx: number) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircle size={16} color="#10b981" />
                        <Typography variant="body2">{p}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {generatedPlan.reviewFrequency && (
                <Paper sx={{ p: 2, bgcolor: alpha("#6366f1", 0.04), boxShadow: "none", border: "1px solid", borderColor: alpha("#6366f1", 0.15) }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#6366f1", display: "block", mb: 0.5 }}>
                    Review Frequency
                  </Typography>
                  <Typography variant="body2">{generatedPlan.reviewFrequency}</Typography>
                </Paper>
              )}
            </Stack>
          )}
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        AI HACCP Plan Generator
      </Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <Bot size={20} />
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Generate Your HACCP Plan in 15 Seconds
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AI-powered compliance builder — FSA-aligned templates
            </Typography>
          </Box>
        </Box>

        <Box sx={{ overflowX: "auto", mb: 3, mx: { xs: -2, sm: 0 }, px: { xs: 2, sm: 0 } }}>
          <Stepper
            activeStep={step}
            alternativeLabel
            sx={{
              minWidth: { xs: 480, sm: "auto" },
              "& .MuiStepLabel-label": { fontSize: { xs: "0.75rem", sm: "0.875rem" }, mt: { xs: 0.5, sm: 1 } },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {step === 0 && (
          <FormControl fullWidth>
            <InputLabel>Select Business Type</InputLabel>
            <Select value={businessType} onChange={(e) => setBusinessType(e.target.value)} label="Select Business Type">
              <MenuItem key="restaurant" value="Restaurant / Café">Restaurant / Café</MenuItem>
              <MenuItem key="takeaway" value="Takeaway / Fast Food">Takeaway / Fast Food</MenuItem>
              <MenuItem key="pub" value="Pub / Bar">Pub / Bar</MenuItem>
              <MenuItem key="catering" value="Catering Service">Catering Service</MenuItem>
              <MenuItem key="bakery" value="Bakery / Patisserie">Bakery / Patisserie</MenuItem>
              <MenuItem key="dark-kitchen" value="Dark Kitchen / Delivery-only">Dark Kitchen / Delivery-only</MenuItem>
            </Select>
          </FormControl>
        )}

        {step === 1 && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select all that apply (you can pick multiple)
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {FOOD_CATEGORY_OPTIONS.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  onClick={() => toggleCategory(cat)}
                  color={foodCategories.includes(cat) ? "primary" : "default"}
                  variant={foodCategories.includes(cat) ? "filled" : "outlined"}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Review your inputs
            </Typography>
            <Paper sx={{ p: 2, bgcolor: alpha("#6366f1", 0.04), boxShadow: "none", border: "1px solid", borderColor: alpha("#6366f1", 0.15) }}>
              <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>Business Type</Typography>
              <Typography variant="body2" sx={{ mb: 1.5 }}>{businessType || "—"}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>Food Categories</Typography>
              <Typography variant="body2">{foodCategories.length ? foodCategories.join(", ") : "None selected"}</Typography>
            </Paper>
          </Box>
        )}

        {step === 3 && !loading && !error && (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Click "Generate" below to create your HACCP plan with AI.
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Generating your HACCP plan... this usually takes 5-15 seconds.
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
          <Button disabled={step === 0 || loading} onClick={() => setStep(step - 1)}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={loading || (step === 0 && !businessType)}
            onClick={() => {
              if (step === 3) {
                handleGenerate();
              } else {
                setStep(step + 1);
              }
            }}
          >
            {step === 3 ? (loading ? "Generating..." : "Generate HACCP Plan") : "Next"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

// Helper to call our serverless /api/ai endpoint. Throws on error so callers
// can handle it. Returns the parsed `result` field.
async function callAI(payload: any): Promise<any> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `AI request failed (${res.status})`);
  }
  return data.result;
}

// Empty State Component
function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: any) {
  return (
    <Box sx={{ textAlign: "center", py: 8, px: 3 }}>
      <Avatar sx={{ width: 64, height: 64, bgcolor: alpha("#6366f1", 0.1), mx: "auto", mb: 2 }}>
        <Icon size={32} color="#6366f1" />
      </Avatar>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
        {description}
      </Typography>
      {actionLabel && (
        <Button variant="contained" onClick={onAction} startIcon={<Plus size={16} />}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

// Onboarding Wizard Component
function OnboardingWizard({ onComplete, onClose }: any) {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [mode, setMode] = useState("full");

  const steps = ["Welcome", "Business Type", "Choose Mode", "Get Started"];

  const handleComplete = () => {
    onComplete({ businessType, businessName, mode });
  };

  return (
    <Dialog
      open
      fullWidth
      maxWidth="sm"
      fullScreen={typeof window !== "undefined" && window.innerWidth < 600}
      PaperProps={{ sx: { borderRadius: { xs: 0, sm: 2 } } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <X size={20} />
        </IconButton>
        <Box sx={{ textAlign: "center" }}>
          <Avatar sx={{ width: { xs: 48, sm: 64 }, height: { xs: 48, sm: 64 }, bgcolor: "primary.main", mx: "auto", mb: { xs: 1, sm: 2 } }}>
            <Shield size={28} color="white" />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
            Welcome to FoodSafe Pro
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{
            mb: { xs: 2.5, sm: 4 },
            "& .MuiStepLabel-label": { fontSize: { xs: "0.7rem", sm: "0.875rem" }, mt: { xs: 0.5, sm: 1 } },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {step === 0 && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Let's get you set up in just a few steps. We'll customize your experience based on your business needs.
            </Typography>
            <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
              <Paper key="feature-ai" sx={{ p: 2, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CheckCircle size={20} color="#10b981" style={{ marginBottom: 8 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>AI-Powered Compliance</Typography>
                <Typography variant="caption" color="text.secondary">Automated HACCP plans & predictions</Typography>
              </Paper>
              <Paper key="feature-complete" sx={{ p: 2, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <Shield size={20} color="#6366f1" style={{ marginBottom: 8 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Complete Management</Typography>
                <Typography variant="caption" color="text.secondary">All your compliance needs in one place</Typography>
              </Paper>
            </Box>
          </Box>
        )}

        {step === 1 && (
          <Box>
            <TextField
              fullWidth
              label="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth>
              <InputLabel>Business Type</InputLabel>
              <Select value={businessType} onChange={(e) => setBusinessType(e.target.value)} label="Business Type">
                <MenuItem key="restaurant" value="restaurant">Restaurant / Café</MenuItem>
                <MenuItem key="takeaway" value="takeaway">Takeaway / Fast Food</MenuItem>
                <MenuItem key="pub" value="pub">Pub / Bar</MenuItem>
                <MenuItem key="catering" value="catering">Catering Service</MenuItem>
                <MenuItem key="bakery" value="bakery">Bakery / Patisserie</MenuItem>
                <MenuItem key="hotel" value="hotel">Hotel / B&B</MenuItem>
                <MenuItem key="retail" value="retail">Retail Food Shop</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
              Choose the experience that fits your business size
            </Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              <Paper
                key="mode-lite"
                onClick={() => setMode("lite")}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  boxShadow: "none",
                  border: `2px solid ${mode === "lite" ? "#6366f1" : "divider"}`,
                  bgcolor: mode === "lite" ? alpha("#6366f1", 0.02) : "white",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "#6366f1" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Zap size={24} color="#6366f1" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Lite Mode</Typography>
                  <Chip label="Recommended for small businesses" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Simplified interface with essential features: checklists, temperature monitoring, and basic compliance tracking. Perfect for single-location cafés and small eateries.
                </Typography>
              </Paper>

              <Paper
                key="mode-full"
                onClick={() => setMode("full")}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  boxShadow: "none",
                  border: `2px solid ${mode === "full" ? "#6366f1" : "divider"}`,
                  bgcolor: mode === "full" ? alpha("#6366f1", 0.02) : "white",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "#6366f1" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Target size={24} color="#6366f1" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Full Mode</Typography>
                  <Chip label="For growing businesses" size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Complete feature set with AI predictions, HACCP management, supplier tracking, traceability, sustainability metrics, and advanced integrations. Ideal for multi-location operations.
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}

        {step === 3 && (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CheckCircle size={48} color="#10b981" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              You're All Set!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {mode === "lite"
                ? "Starting with Lite Mode - you can upgrade to Full Mode anytime from Settings."
                : "Starting with Full Mode - you can switch to Lite Mode anytime from Settings."}
            </Typography>
            <Paper sx={{ p: 2, boxShadow: "none", border: "1px solid", borderColor: "divider", bgcolor: alpha("#6366f1", 0.02) }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>💡 Quick Tip</Typography>
              <Typography variant="caption" color="text.secondary">
                Click the AI assistant button (bottom right) anytime you need help with compliance questions or generating HACCP plans.
              </Typography>
            </Paper>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={step === 0} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => step === 3 ? handleComplete() : setStep(step + 1)}
          disabled={step === 1 && (!businessType || !businessName)}
        >
          {step === 3 ? "Start Using FoodSafe Pro" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Main App Component
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [user, setUser] = useState("Sarah Mitchell");
  const [selectedLocation] = useState("Main Location");
  const [offline] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [liteMode, setLiteMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userRole, setUserRole] = useState<"owner" | "staff">("owner");
  const isOwner = userRole === "owner";

  // AI Improvement Plan state
  const [improvementOpen, setImprovementOpen] = useState(false);
  const [improvementLoading, setImprovementLoading] = useState(false);
  const [improvementError, setImprovementError] = useState<string | null>(null);
  const [improvementPlan, setImprovementPlan] = useState<any>(null);

  // Ask AI chat state
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const handleLogin = (role: "owner" | "staff") => {
    setUserRole(role);
    setUser(role === "owner" ? "Sarah Mitchell" : "James Hargreaves");
    setLoggedIn(true);
    setActiveTab(0);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowMobileMenu(false);
    setActiveTab(0);
  };

  // Dialog states for forms
  const [showAddLicence, setShowAddLicence] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [showAddEnvironmental, setShowAddEnvironmental] = useState(false);
  const [showAddOperational, setShowAddOperational] = useState(false);
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showAddIncident, setShowAddIncident] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showAddTemperature, setShowAddTemperature] = useState(false);
  const [showRecordReading, setShowRecordReading] = useState(false);
  const [showAddSustainability, setShowAddSustainability] = useState(false);

  const complianceScore = calculateComplianceScore(data);
  const scoreColor = getComplianceColor(complianceScore);

  const mainTabs = [
    { label: "Dashboard", icon: BarChart3, lite: true, category: "Core", ownerOnly: false },
    { label: "Compliance Records", icon: FileText, lite: true, category: "Core", ownerOnly: false },
    { label: "Temperature", icon: Thermometer, lite: true, category: "Core", ownerOnly: false },
    { label: "Checklists", icon: CheckSquare, lite: true, category: "Core", ownerOnly: false },
    { label: "HACCP", icon: Shield, lite: false, category: "Advanced", ownerOnly: false },
    { label: "Training", icon: Award, lite: true, category: "Core", ownerOnly: false },
    { label: "Allergens", icon: AlertTriangle, lite: true, category: "Core", ownerOnly: false },
    { label: "Suppliers", icon: Package, lite: false, category: "Advanced", ownerOnly: true },
    { label: "Incidents", icon: AlertCircle, lite: true, category: "Core", ownerOnly: false },
    { label: "Equipment", icon: Wrench, lite: false, category: "Advanced", ownerOnly: false },
    { label: "Recipes", icon: BookOpen, lite: false, category: "Advanced", ownerOnly: false },
    { label: "Traceability", icon: Database, lite: false, category: "Advanced", ownerOnly: true },
    { label: "Sustainability", icon: Leaf, lite: false, category: "Advanced", ownerOnly: true },
    { label: "Integrations", icon: Wifi, lite: false, category: "Advanced", ownerOnly: true },
  ];

  const visibleTabs = (liteMode ? mainTabs.filter(tab => tab.lite) : mainTabs).filter(tab => isOwner || !tab.ownerOnly);
  const safeActiveTab = activeTab >= visibleTabs.length ? 0 : activeTab;
  const activeTabLabel = visibleTabs[safeActiveTab]?.label;

  const handleOnboardingComplete = (settings: any) => {
    setLiteMode(settings.mode === "lite");
    setShowOnboarding(false);
  };

  const handleGenerateHACCP = (plan: any) => {
    // Optionally save into the data state (could be persisted to backend later)
    if (plan && plan.title && plan.criticalControlPoints) {
      setData((prev: any) => ({
        ...prev,
        haccp: [
          ...(prev.haccp || []),
          {
            id: Date.now(),
            title: plan.title,
            ccps: plan.criticalControlPoints.length,
            createdBy: "AI Generated",
            category: plan.criticalControlPoints[0]?.name?.split(" ")[0] || "General",
            status: "active",
            lastReview: new Date().toISOString().slice(0, 10),
            nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          },
        ],
      }));
    }
  };

  const handleFHRSSubmission = () => {
    alert("Submitting compliance report to Food Standards Agency...");
  };

  const handleExportReport = () => {
    alert("Exporting comprehensive compliance report (PDF/Excel)...");
  };

  // Generate AI improvement plan based on the user's current data
  const handleGenerateImprovement = async () => {
    setImprovementOpen(true);
    setImprovementLoading(true);
    setImprovementError(null);
    setImprovementPlan(null);
    try {
      // Build a compact summary to send to the AI (don't dump the whole data object)
      const summary = {
        complianceScore,
        licences: (data.licences || []).map((x: any) => ({ title: x.title, status: x.status, expiry: x.expiry })),
        certifications: (data.certifications || []).map((x: any) => ({ title: x.title, status: x.status, nextDue: x.nextDue })),
        insurance: (data.insurance || []).map((x: any) => ({ title: x.title, status: x.status, renewal: x.renewal })),
        environmental: (data.environmental || []).map((x: any) => ({ title: x.title, status: x.status })),
        operational: (data.operational || []).map((x: any) => ({ title: x.title, status: x.status })),
        training: (data.training || []).map((x: any) => ({ name: x.name, role: x.role, status: x.status })),
        temperatures: (data.temperatures || []).map((t: any) => ({ name: t.name, status: t.status })),
        haccpPlanCount: (data.haccp || []).length,
        allergenItemCount: (data.allergens?.menu || []).length,
      };
      const result = await callAI({ mode: "improvement", complianceData: summary });
      setImprovementPlan(result);
    } catch (e: any) {
      setImprovementError(e?.message || "Failed to generate improvement plan");
    } finally {
      setImprovementLoading(false);
    }
  };

  // Send a chat message
  const handleSendChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const newMessages: { role: "user" | "model"; content: string }[] = [
      ...chatMessages,
      { role: "user", content: text },
    ];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);
    setChatError(null);
    try {
      const context = {
        role: userRole,
        complianceScore,
        upcomingExpiries: [...(data.licences || []), ...(data.certifications || [])]
          .filter((x: any) => x.expiry || x.nextDue)
          .slice(0, 10)
          .map((x: any) => ({ title: x.title, due: x.expiry || x.nextDue })),
      };
      const reply = await callAI({ mode: "chat", messages: newMessages, context });
      setChatMessages([...newMessages, { role: "model", content: reply }]);
    } catch (e: any) {
      setChatError(e?.message || "Chat failed");
    } finally {
      setChatLoading(false);
    }
  };

  // Login screen - shown when user is not logged in
  if (!loggedIn) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <Card sx={{ maxWidth: 420, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid", borderColor: "divider" }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  boxShadow: 2,
                }}
              >
                <Shield size={32} color="white" />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {data.whiteLabel.brandName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to continue
              </Typography>
            </Box>

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Lock size={18} />}
                onClick={() => handleLogin("owner")}
                sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontSize: "1rem", fontWeight: 600, boxShadow: 1 }}
              >
                Login as Owner
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<Users size={18} />}
                onClick={() => handleLogin("staff")}
                sx={{ py: 1.5, borderRadius: 2, textTransform: "none", fontSize: "1rem", fontWeight: 600, borderColor: "divider" }}
              >
                Login as Staff
              </Button>
            </Stack>

            <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha("#6366f1", 0.04), border: "1px solid", borderColor: alpha("#6366f1", 0.15) }}>
              <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#6366f1", mb: 0.5 }}>
                Demo mode
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.5 }}>
                Owner sees everything. Staff sees only operational sections (no pricing, suppliers, scores, or others' training records).
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Header */}
      <Box sx={{ bgcolor: "white", borderBottom: "1px solid", borderColor: "divider", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ py: { xs: 1.5, sm: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, minWidth: 0, flex: 1 }}>
                {/* Hamburger - mobile only, shown FIRST */}
                <IconButton
                  onClick={() => setShowMobileMenu(true)}
                  sx={{
                    display: { xs: "inline-flex", md: "none" },
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1.5,
                  }}
                >
                  <MenuIcon size={20} />
                </IconButton>

                <Box
                  sx={{
                    width: { xs: 38, sm: 48 },
                    height: { xs: 38, sm: 48 },
                    borderRadius: { xs: 2, sm: 3 },
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                    flexShrink: 0,
                  }}
                >
                  <Shield size={20} color="white" />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{ fontWeight: 700, letterSpacing: -0.5, fontSize: { xs: "1rem", sm: "1.25rem" }, lineHeight: 1.2 }}
                  >
                    {data.whiteLabel.brandName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: { xs: "0.75rem", sm: "0.8125rem" } }}>
                      {user} • {selectedLocation}
                    </Typography>
                    {offline && (
                      <Chip icon={<WifiOff size={12} />} label="Offline" size="small" sx={{ height: 20, fontSize: "0.7rem" }} />
                    )}
                  </Box>
                </Box>
              </Box>

              <Stack direction="row" spacing={{ xs: 0.5, sm: 1 }} alignItems="center" sx={{ flexShrink: 0 }}>
                {/* Lite/Pro toggle - owner only */}
                {isOwner && (
                  <Chip
                    icon={liteMode ? <Zap size={14} /> : <Star size={14} />}
                    label={liteMode ? "Lite" : "Pro"}
                    size="small"
                    onClick={() => setLiteMode(!liteMode)}
                    sx={{
                      bgcolor: liteMode ? alpha("#6366f1", 0.1) : alpha("#f59e0b", 0.1),
                      color: liteMode ? "#6366f1" : "#f59e0b",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      height: { xs: 26, sm: 30 },
                      fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                      "& .MuiChip-icon": { color: "inherit" },
                    }}
                  />
                )}
                {isOwner && (
                  <Tooltip title="Submit to FSA">
                    <Button
                      variant="outlined"
                      startIcon={<Send size={16} />}
                      onClick={handleFHRSSubmission}
                      sx={{ display: { xs: "none", md: "inline-flex" }, borderRadius: 2 }}
                    >
                      Submit FHRS
                    </Button>
                  </Tooltip>
                )}
                {isOwner && (
                  <Button
                    variant="contained"
                    startIcon={<Download size={16} />}
                    onClick={handleExportReport}
                    sx={{ display: { xs: "none", md: "inline-flex" }, borderRadius: 2, boxShadow: 1 }}
                  >
                    Export
                  </Button>
                )}
                {/* Logout button (always visible) */}
                <Tooltip title="Log out">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      color: "text.secondary",
                    }}
                  >
                    <LogOut size={18} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
        {/* Compliance Score Banner - owner only */}
        {isOwner && (
        <MotionCard
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            mb: { xs: 2.5, sm: 4 },
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", alignItems: { xs: "stretch", md: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 3 } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, mb: 1.5, flexWrap: "wrap" }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: scoreColor, fontSize: { xs: "2rem", sm: "2.5rem" }, lineHeight: 1 }}>
                    {complianceScore}%
                  </Typography>
                  <Chip
                    icon={<Lightbulb size={14} />}
                    label={complianceScore >= 90 ? "Excellent - Inspection Ready" : complianceScore >= 70 ? "Good - Minor Improvements" : "Action Required"}
                    size="small"
                    sx={{ bgcolor: alpha(scoreColor, 0.12), color: scoreColor, fontWeight: 600, border: "none" }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
                  Real-time Compliance Score • AI Prediction: Likely 5-star FHRS
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={complianceScore}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(scoreColor, 0.08),
                    "& .MuiLinearProgress-bar": { bgcolor: scoreColor, borderRadius: 4 },
                  }}
                />
              </Box>
              <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", md: "auto" }, "& > button": { flex: { xs: 1, md: "0 0 auto" } } }}>
                <Button variant="outlined" size="medium" startIcon={<Bot size={18} />} onClick={() => setShowAI(true)} sx={{ borderRadius: 2, whiteSpace: "nowrap" }}>
                  Ask AI
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<Target size={18} />}
                  sx={{ borderRadius: 2, boxShadow: 1, whiteSpace: "nowrap" }}
                  onClick={handleGenerateImprovement}
                >
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>Improvement Plan</Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>Improve</Box>
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </MotionCard>
        )}

        {/* Main Tabs - desktop only */}
        <Paper sx={{ mb: 4, boxShadow: "none", border: "1px solid", borderColor: "divider", borderRadius: 2, display: { xs: "none", md: "block" } }}>
          <Tabs
            value={safeActiveTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                minHeight: 52,
                px: { xs: 1.5, sm: 2.5 },
              },
            }}
          >
            {visibleTabs.map((tab, idx) => {
              const Icon = tab.icon;
              return (
                <Tab
                  key={idx}
                  icon={<Icon size={18} />}
                  iconPosition="start"
                  label={tab.label}
                  sx={{ display: "flex", gap: 0.5 }}
                />
              );
            })}
          </Tabs>
        </Paper>

        {/* Mobile section title - shows current section name */}
        <Box
          sx={{
            mb: { xs: 2.5, sm: 3 },
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {(() => {
            const ActiveIcon = visibleTabs[safeActiveTab]?.icon || MenuIcon;
            return <ActiveIcon size={22} color="#2196f3" />;
          })()}
          <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
            {visibleTabs[safeActiveTab]?.label || "Menu"}
          </Typography>
        </Box>

        {/* Mobile menu drawer */}
        <Drawer
          anchor="left"
          open={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          PaperProps={{ sx: { width: "85%", maxWidth: 320, display: "flex", flexDirection: "column" } }}
        >
          {/* User info header */}
          <Box sx={{ p: 2.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: isOwner ? "primary.main" : "#10b981", width: 40, height: 40 }}>
              {isOwner ? <Lock size={18} color="white" /> : <Users size={18} color="white" />}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }} noWrap>
                {user}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {isOwner ? "Owner" : "Staff Member"}
              </Typography>
            </Box>
            <IconButton onClick={() => setShowMobileMenu(false)} size="small">
              <X size={20} />
            </IconButton>
          </Box>

          {/* Nav items */}
          <List sx={{ p: 1, flex: 1, overflowY: "auto" }}>
            {visibleTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = safeActiveTab === idx;
              return (
                <ListItem
                  key={idx}
                  onClick={() => {
                    setActiveTab(idx);
                    setShowMobileMenu(false);
                  }}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 1.5,
                    mb: 0.5,
                    bgcolor: isActive ? alpha("#2196f3", 0.1) : "transparent",
                    color: isActive ? "primary.main" : "text.primary",
                    "&:hover": { bgcolor: isActive ? alpha("#2196f3", 0.15) : "action.hover" },
                  }}
                >
                  <Box sx={{ mr: 2, display: "flex" }}>
                    <Icon size={20} />
                  </Box>
                  <ListItemText
                    primary={tab.label}
                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500, fontSize: "0.95rem" }}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Logout footer */}
          <Box sx={{ p: 1, borderTop: "1px solid", borderColor: "divider" }}>
            <ListItem
              onClick={handleLogout}
              sx={{
                cursor: "pointer",
                borderRadius: 1.5,
                color: "#ef4444",
                "&:hover": { bgcolor: alpha("#ef4444", 0.08) },
              }}
            >
              <Box sx={{ mr: 2, display: "flex" }}>
                <LogOut size={20} />
              </Box>
              <ListItemText
                primary="Log out"
                primaryTypographyProps={{ fontWeight: 600, fontSize: "0.95rem" }}
              />
            </ListItem>
          </Box>
        </Drawer>

        {/* Dashboard View */}
        {activeTabLabel === "Dashboard" && (
          <Box sx={{ display: "grid", gap: 3 }}>
            {/* Quick Stats */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
              <MotionCard key="stat-temps" whileHover={{ y: -2 }} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#10b981", 0.1), width: 48, height: 48 }}>
                      <Thermometer size={22} color="#10b981" />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#10b981", fontSize: "1.75rem" }}>
                        {data.temperatures.filter((t: any) => t.status === "normal").length}/{data.temperatures.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", mt: 0.5 }}>
                        Temps Normal
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>

              <MotionCard key="stat-tasks" whileHover={{ y: -2 }} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#6366f1", 0.1), width: 48, height: 48 }}>
                      <CheckSquare size={22} color="#6366f1" />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#6366f1", fontSize: "1.75rem" }}>
                        {data.checklists.filter((c: any) => c.status === "completed").length}/{data.checklists.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", mt: 0.5 }}>
                        Tasks Complete
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>

              <MotionCard key="stat-training" whileHover={{ y: -2 }} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#8b5cf6", 0.1), width: 48, height: 48 }}>
                      <Users size={22} color="#8b5cf6" />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#8b5cf6", fontSize: "1.75rem" }}>
                        {data.training.filter((t: any) => t.status === "compliant").length}/{data.training.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", mt: 0.5 }}>
                        Staff Trained
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>

              <MotionCard key="stat-recycling" whileHover={{ y: -2 }} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#22c55e", 0.1), width: 48, height: 48 }}>
                      <Leaf size={22} color="#22c55e" />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: "#22c55e", fontSize: "1.75rem" }}>
                        {data.sustainability.waste.recyclingRate}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem", mt: 0.5 }}>
                        Recycling Rate
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Box>

            {/* AI Insights */}
            <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                    <Bot size={20} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                      AI Compliance Insights
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                      Predictive analytics powered by machine learning
                    </Typography>
                  </Box>
                </Box>
                <Stack spacing={3}>
                  <Alert severity="warning" icon={<Lightbulb size={18} />}>
                    <strong>Prediction:</strong> Display Fridge likely to exceed safe temperature range within 4 hours. Schedule maintenance now to prevent food waste.
                  </Alert>
                  <Alert severity="info" icon={<TrendingUp size={18} />}>
                    <strong>Pattern Detected:</strong> Deep cleaning tasks consistently completed late on Wednesdays. Consider rescheduling or adding extra staff.
                  </Alert>
                  <Alert severity="success" icon={<Award size={18} />}>
                    <strong>Achievement:</strong> Your compliance score has improved 12% this month. On track for 5-star FHRS rating at next inspection.
                  </Alert>
                </Stack>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 3 }}>
              {/* Recent Activity */}
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontSize: "1rem" }}>
                    Recent Activity
                  </Typography>
                  {/* Activity list with proper keys for all children */}
                  <Stack spacing={0} divider={<Divider />}>
                    <Box key="activity-checklist" sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: alpha("#10b981", 0.1) }}>
                        <CheckCircle size={20} color="#10b981" />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 0.5 }}>
                          Opening Checklist completed
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                          James Hargreaves • 15 mins ago
                        </Typography>
                      </Box>
                    </Box>
                    <Box key="activity-temp" sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: alpha("#ef4444", 0.1) }}>
                        <AlertTriangle size={20} color="#ef4444" />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 0.5 }}>
                          Temperature alert: Display Fridge
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                          System • 28 mins ago
                        </Typography>
                      </Box>
                    </Box>
                    <Box key="activity-certificate" sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: alpha("#6366f1", 0.1) }}>
                        <Upload size={20} color="#6366f1" />
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 0.5 }}>
                          Gas Safety Certificate uploaded
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                          Sarah Mitchell • 2 hours ago
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Upcoming Renewals */}
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontSize: "1rem" }}>
                    Upcoming Renewals
                  </Typography>
                  <Stack spacing={3}>
                    <Box key="renewal-fridge" sx={{ p: 2.5, bgcolor: alpha("#f59e0b", 0.04), borderRadius: 2, borderLeft: `3px solid #f59e0b` }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.875rem" }}>
                        Walk-in Fridge Compressor Service
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                        Due in 13 days • Williams WBC-500
                      </Typography>
                    </Box>
                    <Box key="renewal-training" sx={{ p: 2.5, bgcolor: alpha("#f59e0b", 0.04), borderRadius: 2, borderLeft: `3px solid #f59e0b` }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, fontSize: "0.875rem" }}>
                        David Chen - Allergen Training
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                        Expires in 181 days • Renewal recommended
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {/* Compliance Records Tab */}
        {activeTabLabel === "Compliance Records" && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Compliance Records
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage all your licenses, certificates, insurance policies, and compliance documentation
              </Typography>
            </Box>

            {/* === COMPLIANCE DASHBOARD === */}
            {(() => {
              // Collect all compliance items into one list with normalized fields
              const allItems = [
                ...(data.licences || []).map((x: any) => ({ ...x, type: "Licence", expiryDate: x.expiry, name: x.title })),
                ...(data.certifications || []).map((x: any) => ({ ...x, type: "Certificate", expiryDate: x.nextDue, name: x.title })),
                ...(data.insurance || []).map((x: any) => ({ ...x, type: "Insurance", expiryDate: x.renewal, name: x.title })),
                ...(data.environmental || []).map((x: any) => ({ ...x, type: "Environmental", expiryDate: x.contractEnd, name: x.title })),
                ...(data.operational || []).map((x: any) => ({ ...x, type: "Operational", expiryDate: x.nextDue || x.expiry, name: x.title })),
              ];

              // Urgent items: expiring in 30 days or already expired
              const urgentItems = allItems
                .filter((item: any) => item.expiryDate)
                .map((item: any) => ({ ...item, daysLeft: daysUntil(item.expiryDate) }))
                .filter((item: any) => item.daysLeft < 60)
                .sort((a: any, b: any) => a.daysLeft - b.daysLeft);

              // Status counts by category
              const categoryStats = [
                { label: "Licences", icon: FileText, color: "#6366f1", items: data.licences || [], statusKey: "status" },
                { label: "Certificates", icon: Shield, color: "#10b981", items: data.certifications || [], statusKey: "status" },
                { label: "Insurance", icon: Lock, color: "#f59e0b", items: data.insurance || [], statusKey: "status" },
                { label: "Environmental", icon: Leaf, color: "#22c55e", items: data.environmental || [], statusKey: "status" },
                { label: "Operational", icon: Wrench, color: "#14b8a6", items: data.operational || [], statusKey: "status" },
              ];

              // Required-by-law checklist for UK food businesses
              const legalRequirements = [
                { label: "Food Business Registration", required: true, present: (data.licences || []).some((l: any) => l.title?.toLowerCase().includes("food")) },
                { label: "Public Liability Insurance", required: true, present: (data.insurance || []).some((i: any) => i.type?.toLowerCase().includes("liability")) },
                { label: "Employers' Liability Insurance", required: true, present: (data.insurance || []).some((i: any) => i.type?.toLowerCase().includes("employer")) },
                { label: "Gas Safety Certificate", required: true, present: (data.certifications || []).some((c: any) => c.category === "Gas Safety") },
                { label: "Electrical Safety Certificate", required: true, present: (data.certifications || []).some((c: any) => c.category === "Electrical Safety") },
                { label: "Fire Safety Risk Assessment", required: true, present: (data.certifications || []).some((c: any) => c.category === "Fire Safety") },
                { label: "Waste Collection Contract", required: true, present: (data.environmental || []).some((e: any) => e.category === "Waste Collection" || e.category === "Environmental") },
                { label: "Pest Control", required: true, present: (data.environmental || []).some((e: any) => e.category === "Pest Control") },
                { label: "HACCP Plan", required: true, present: data.haccp && data.haccp.length > 0 },
                { label: "Allergen Information (Natasha's Law)", required: true, present: data.allergens?.menu?.some((m: any) => m.natashasLaw) },
              ];
              const missingRequirements = legalRequirements.filter(r => !r.present);
              const completedRequirements = legalRequirements.filter(r => r.present);

              // Audit log (mock entries)
              const auditLog = [
                { ts: "2025-05-07 14:30", who: "Sarah Mitchell", action: "Updated Gas Safety Certificate", type: "edit" },
                { ts: "2025-05-06 09:15", who: "James Hargreaves", action: "Recorded temperature reading - Walk-in Fridge", type: "create" },
                { ts: "2025-05-05 16:42", who: "Sarah Mitchell", action: "Added Public Liability Insurance renewal", type: "create" },
                { ts: "2025-05-04 11:20", who: "David Chen", action: "Completed daily checklist - Opening procedures", type: "complete" },
                { ts: "2025-05-03 13:55", who: "Sarah Mitchell", action: "Uploaded Fire Safety Assessment document", type: "upload" },
              ];

              return (
                <>
                  {/* Urgent items banner */}
                  {urgentItems.length > 0 && (
                    <Card sx={{ mb: 3, boxShadow: "none", border: "1px solid", borderColor: alpha("#ef4444", 0.3), bgcolor: alpha("#ef4444", 0.02) }}>
                      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                          <AlertTriangle size={20} color="#ef4444" />
                          <Typography variant="h6" sx={{ fontWeight: 700, color: "#ef4444", fontSize: "1.05rem" }}>
                            Action Required ({urgentItems.length})
                          </Typography>
                        </Box>
                        <Stack spacing={1}>
                          {urgentItems.slice(0, 5).map((item: any, idx: number) => {
                            const isExpired = item.daysLeft < 0;
                            const colour = isExpired ? "#ef4444" : item.daysLeft < 14 ? "#ef4444" : item.daysLeft < 30 ? "#f59e0b" : "#6366f1";
                            return (
                              <Box key={idx} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 0.5, p: 1.5, bgcolor: "white", borderRadius: 1.5, border: "1px solid", borderColor: "divider" }}>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {item.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {item.type} • {formatDate(item.expiryDate)}
                                  </Typography>
                                </Box>
                                <Chip
                                  size="small"
                                  label={isExpired ? `Expired ${Math.abs(item.daysLeft)}d ago` : `${item.daysLeft}d left`}
                                  sx={{ bgcolor: alpha(colour, 0.12), color: colour, fontWeight: 600, flexShrink: 0 }}
                                />
                              </Box>
                            );
                          })}
                        </Stack>
                      </CardContent>
                    </Card>
                  )}

                  {/* Status overview by category */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }, gap: 2, mb: 3 }}>
                    {categoryStats.map((cat) => {
                      const Icon = cat.icon;
                      const total = cat.items.length;
                      const compliant = cat.items.filter((i: any) => i[cat.statusKey] === "compliant" || i[cat.statusKey] === "active" || i[cat.statusKey] === "approved").length;
                      const pct = total ? Math.round((compliant / total) * 100) : 0;
                      return (
                        <Card key={cat.label} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Box sx={{ p: 0.75, borderRadius: 1, bgcolor: alpha(cat.color, 0.1), display: "flex" }}>
                                <Icon size={16} color={cat.color} />
                              </Box>
                              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.75rem" }}>
                                {cat.label}
                              </Typography>
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "1.5rem", mb: 0.5 }}>
                              {compliant}<Typography component="span" variant="body2" color="text.secondary" sx={{ fontWeight: 400 }}>/{total}</Typography>
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={pct}
                              sx={{ height: 4, borderRadius: 2, bgcolor: alpha(cat.color, 0.1), "& .MuiLinearProgress-bar": { bgcolor: cat.color } }}
                            />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Box>

                  {/* Two-column area: Legal checklist + Upcoming timeline */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
                    {/* Legal requirements checklist */}
                    <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            UK Food Business Requirements
                          </Typography>
                          <Chip
                            size="small"
                            label={`${completedRequirements.length}/${legalRequirements.length}`}
                            color={missingRequirements.length === 0 ? "success" : "warning"}
                          />
                        </Box>
                        <Stack spacing={1}>
                          {legalRequirements.map((req, idx) => (
                            <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
                              {req.present ? (
                                <CheckCircle size={18} color="#10b981" />
                              ) : (
                                <AlertCircle size={18} color="#ef4444" />
                              )}
                              <Typography variant="body2" sx={{ flex: 1, fontWeight: req.present ? 400 : 600, color: req.present ? "text.primary" : "#ef4444" }}>
                                {req.label}
                              </Typography>
                              {!req.present && (
                                <Chip size="small" label="Missing" sx={{ bgcolor: alpha("#ef4444", 0.1), color: "#ef4444", fontWeight: 600, height: 20, fontSize: "0.7rem" }} />
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>

                    {/* Upcoming timeline */}
                    <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Calendar size={18} color="#6366f1" />
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Upcoming (next 6 months)
                          </Typography>
                        </Box>
                        <Stack spacing={1}>
                          {allItems
                            .filter((item: any) => item.expiryDate && daysUntil(item.expiryDate) >= 0 && daysUntil(item.expiryDate) <= 180)
                            .sort((a: any, b: any) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate))
                            .slice(0, 8)
                            .map((item: any, idx: number) => {
                              const days = daysUntil(item.expiryDate);
                              return (
                                <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
                                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: days < 30 ? "#ef4444" : days < 90 ? "#f59e0b" : "#10b981", flexShrink: 0 }} />
                                  <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>
                                      {item.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {item.type} • {formatDate(item.expiryDate)}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: days < 30 ? "#ef4444" : days < 90 ? "#f59e0b" : "text.secondary", flexShrink: 0 }}>
                                    {days}d
                                  </Typography>
                                </Box>
                              );
                            })}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>

                  {/* Audit log - owner only */}
                  {isOwner && (
                    <Card sx={{ mb: 4, boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                      <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <History size={18} color="#6366f1" />
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            Recent Activity
                          </Typography>
                        </Box>
                        <Stack spacing={1.5} divider={<Divider />}>
                          {auditLog.map((entry, idx) => (
                            <Box key={idx} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 0.25, sm: 1.5 } }}>
                              <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {entry.action}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {entry.who} • {entry.ts}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  )}

                  <Divider sx={{ my: 3 }} />
                </>
              );
            })()}

            {/* === DETAIL SECTIONS BELOW === */}

            {/* Licences & Permits */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  Licences & Permits
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => setShowAddLicence(true)}
                >
                  Add Licence
                </Button>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
                {(data.licences || []).map((licence: any) => {
                  const days = daysUntil(licence.expiry);
                  const urgent = days < 60 && days >= 0;
                  return (
                    <Card key={licence.id} sx={{ boxShadow: "none", border: `1px solid ${licence.status === "expired" ? alpha("#ef4444", 0.3) : urgent ? alpha("#f59e0b", 0.3) : "divider"}`, bgcolor: licence.status === "expired" ? alpha("#ef4444", 0.02) : urgent ? alpha("#f59e0b", 0.02) : "white" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                              {licence.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                              {licence.authority}
                            </Typography>
                          </Box>
                          <Chip
                            label={licence.status}
                            size="small"
                            color={licence.status === "active" ? "success" : licence.status === "due-soon" ? "warning" : "error"}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
                          <Chip label={licence.category} size="small" sx={{ bgcolor: alpha("#6366f1", 0.08), color: "#6366f1", border: "none", fontWeight: 500 }} />
                          <Chip label={licence.licenceNo} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.7rem", borderColor: "divider" }} />
                        </Stack>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2.5 }}>
                          <Box key="issued">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Issued</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>{formatDate(licence.issued)}</Typography>
                          </Box>
                          <Box key="expires">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Expires</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", color: licence.status === "expired" ? "#ef4444" : urgent ? "#f59e0b" : "text.primary" }}>
                              {formatDate(licence.expiry)} {urgent && days >= 0 && `(${days}d)`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>{licence.notes}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* Certifications */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  Safety Certifications
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => setShowAddCertificate(true)}
                >
                  Add Certificate
                </Button>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
                {(data.certifications || []).map((cert: any) => {
                  const days = daysUntil(cert.nextDue);
                  const urgent = days < 60 && days >= 0;
                  return (
                    <Card key={cert.id} sx={{ boxShadow: "none", border: `1px solid ${cert.status === "expired" ? alpha("#ef4444", 0.3) : urgent ? alpha("#f59e0b", 0.3) : "divider"}`, bgcolor: cert.status === "expired" ? alpha("#ef4444", 0.02) : urgent ? alpha("#f59e0b", 0.02) : "white" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                              {cert.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                              {cert.supplier}
                            </Typography>
                          </Box>
                          <Chip
                            label={cert.status}
                            size="small"
                            color={cert.status === "compliant" ? "success" : cert.status === "due-soon" ? "warning" : "error"}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
                          {(() => {
                            const chipColor = cert.status === "expired" ? "#ef4444" : cert.status === "due-soon" ? "#f59e0b" : "#6366f1";
                            return <Chip label={cert.category} size="small" sx={{ bgcolor: alpha(chipColor, 0.08), color: chipColor, border: "none", fontWeight: 500 }} />;
                          })()}
                          <Chip label={cert.certNo} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.7rem", borderColor: "divider" }} />
                        </Stack>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2.5 }}>
                          <Box key="last-service-cert">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Last Service</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>{formatDate(cert.lastService)}</Typography>
                          </Box>
                          <Box key="next-due-cert">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Next Due</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", color: cert.status === "expired" ? "#ef4444" : urgent ? "#f59e0b" : "text.primary" }}>
                              {formatDate(cert.nextDue)} {urgent && days >= 0 && `(${days}d)`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>{cert.notes}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* Insurance */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  Insurance Policies
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => setShowAddPolicy(true)}
                >
                  Add Policy
                </Button>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
                {(data.insurance || []).map((policy: any) => {
                  const days = daysUntil(policy.expiry);
                  const urgent = days < 60 && days >= 0;
                  return (
                    <Card key={policy.id} sx={{ boxShadow: "none", border: `1px solid ${policy.status === "expired" ? alpha("#ef4444", 0.3) : urgent ? alpha("#f59e0b", 0.3) : "divider"}`, bgcolor: policy.status === "expired" ? alpha("#ef4444", 0.02) : urgent ? alpha("#f59e0b", 0.02) : "white" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                              {policy.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                              {policy.provider}
                            </Typography>
                          </Box>
                          <Chip
                            label={policy.status}
                            size="small"
                            color={policy.status === "active" ? "success" : "warning"}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Chip label={policy.policyNo} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.7rem", borderColor: "divider", mb: 2.5 }} />
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2.5 }}>
                          <Box key="issued-policy">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Issued</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>{formatDate(policy.issued)}</Typography>
                          </Box>
                          <Box key="expires-policy">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Expires</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", color: urgent ? "#f59e0b" : "text.primary" }}>
                              {formatDate(policy.expiry)} {urgent && days >= 0 && `(${days}d)`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>{policy.notes}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* Environmental */}
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  Environmental Compliance
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => setShowAddEnvironmental(true)}
                >
                  Add Contract
                </Button>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
                {(data.environmental || []).map((env: any) => {
                  const days = daysUntil(env.contractEnd);
                  const urgent = days < 60 && days >= 0;
                  return (
                    <Card key={env.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: urgent ? alpha("#f59e0b", 0.3) : "divider", bgcolor: urgent ? alpha("#f59e0b", 0.02) : "white" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                              {env.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                              {env.supplier}
                            </Typography>
                          </Box>
                          <Chip
                            label={env.status}
                            size="small"
                            color={env.status === "active" ? "success" : "warning"}
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
                          <Chip label={env.category} size="small" sx={{ bgcolor: alpha("#22c55e", 0.08), color: "#22c55e", border: "none", fontWeight: 500 }} />
                          <Chip label={env.contractNo} size="small" variant="outlined" sx={{ fontFamily: "monospace", fontSize: "0.7rem", borderColor: "divider" }} />
                        </Stack>
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2.5 }}>
                          <Box key="start-env">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Start</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>{formatDate(env.contractStart)}</Typography>
                          </Box>
                          <Box key="end-env">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>End</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", color: urgent ? "#f59e0b" : "text.primary" }}>
                              {formatDate(env.contractEnd)} {urgent && days >= 0 && `(${days}d)`}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>{env.notes}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            {/* Operational */}
            <Box>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  Operational Compliance
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  sx={{ borderRadius: 2 }}
                  onClick={() => setShowAddOperational(true)}
                >
                  Add Record
                </Button>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
                {(data.operational || []).map((op: any) => {
                  const days = daysUntil(op.nextVisit);
                  return (
                    <Card key={op.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                              {op.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                              {op.supplier} • {op.frequency}
                            </Typography>
                          </Box>
                          <Chip
                            label={op.status}
                            size="small"
                            color="success"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                        <Chip label={op.category} size="small" sx={{ bgcolor: alpha("#14b8a6", 0.08), color: "#14b8a6", border: "none", fontWeight: 500, mb: 2.5 }} />
                        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mb: 2.5 }}>
                          <Box key="last-visit-op">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Last Visit</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>{formatDate(op.lastVisit)}</Typography>
                          </Box>
                          <Box key="next-visit-op">
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>Next Visit</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                              {formatDate(op.nextVisit)} ({days}d)
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem", lineHeight: 1.5 }}>{op.notes}</Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}

        {/* Temperature Monitoring Tab */}
        {activeTabLabel === "Temperature" && (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3 }}>
            <TemperatureMonitor
              temperatures={data.temperatures}
              onRefresh={() => alert("Refreshing temperature data...")}
              onAddEquipment={() => setShowAddTemperature(true)}
              onRecordReading={() => setShowRecordReading(true)}
            />
            <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Temperature History
                </Typography>
                <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: alpha("#6366f1", 0.05), borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    24-hour temperature chart would display here
                  </Typography>
                </Box>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }} startIcon={<Download size={16} />}>
                  Export Temperature Log
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Checklists Tab */}
        {activeTabLabel === "Checklists" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                Digital Checklists & Tasks
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                sx={{ borderRadius: 2 }}
                onClick={() => setShowAddChecklist(true)}
              >
                Create Checklist
              </Button>
            </Box>
            <Stack spacing={3}>
              {data.checklists.map((checklist: any) => (
                <Card key={checklist.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                          {checklist.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                          Assigned to: {checklist.assignedTo} • Due: {checklist.dueTime}
                        </Typography>
                      </Box>
                      <Chip
                        label={checklist.status === "completed" ? "Completed" : checklist.status === "in-progress" ? "In Progress" : "Pending"}
                        color={checklist.status === "completed" ? "success" : checklist.status === "in-progress" ? "warning" : "default"}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Box sx={{ mb: 2.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                          Progress: {checklist.completed}/{checklist.tasks} tasks
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.8125rem" }}>
                          {Math.round((checklist.completed / checklist.tasks) * 100)}%
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={(checklist.completed / checklist.tasks) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: alpha("#6366f1", 0.08), "& .MuiLinearProgress-bar": { borderRadius: 4 } }} />
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Chip label={checklist.type} size="small" sx={{ fontWeight: 500 }} />
                      <Chip label={checklist.frequency} size="small" variant="outlined" sx={{ borderColor: "divider" }} />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* HACCP Tab */}
        {activeTabLabel === "HACCP" && (
          <Box sx={{ display: "grid", gap: 3 }}>
            <AIHACCPGenerator onGenerate={handleGenerateHACCP} />

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, fontSize: "1.125rem" }}>
                Active HACCP Plans
              </Typography>
              <Stack spacing={3}>
                {data.haccp.map((plan: any) => (
                  <Card key={plan.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2.5 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 0.5 }}>
                            {plan.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8125rem" }}>
                            {plan.ccps} Critical Control Points • Created by: {plan.createdBy}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <Chip label={plan.category} size="small" color="primary" sx={{ fontWeight: 600 }} />
                          <Chip label={plan.status} size="small" color="success" sx={{ fontWeight: 600 }} />
                        </Stack>
                      </Box>
                      <Divider sx={{ my: 2.5 }} />
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 2, sm: 4 } }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                            Last Review
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                            {formatDate(plan.lastReview)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                            Next Review
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                            {formatDate(plan.nextReview)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Box>
        )}

        {/* Training Tab */}
        {activeTabLabel === "Training" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Staff Training & Certifications
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setShowAddStaff(true)}
              >
                Add Staff Member
              </Button>
            </Box>
            {data.training.length === 0 ? (
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <EmptyState
                  icon={Award}
                  title="No Staff Training Records"
                  description="Start tracking your team's training and certifications. Add staff members and their qualifications to ensure compliance."
                  actionLabel="Add First Staff Member"
                  onAction={() => alert("Add staff member")}
                />
              </Card>
            ) : (
              <Box sx={{ overflowX: "auto", border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Level 2</TableCell>
                      <TableCell>Level 3</TableCell>
                      <TableCell>Allergen</TableCell>
                      <TableCell>First Aid</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.training
                      .filter((staff: any) => isOwner || staff.name === user)
                      .map((staff: any) => (
                      <TableRow key={staff.id}>
                        <TableCell sx={{ fontWeight: 600 }}>{staff.name}</TableCell>
                        <TableCell>{staff.role}</TableCell>
                        <TableCell>
                          {staff.level2 ? (
                            <Tooltip title={`Expires: ${formatDate(staff.level2Expiry)}`}>
                              <Chip label={formatDate(staff.level2)} size="small" color="success" />
                            </Tooltip>
                          ) : (
                            <Chip label="N/A" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {staff.level3 ? (
                            <Tooltip title={`Expires: ${formatDate(staff.level3Expiry)}`}>
                              <Chip label={formatDate(staff.level3)} size="small" color="success" />
                            </Tooltip>
                          ) : (
                            <Chip label="N/A" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {staff.allergen ? (
                            <Tooltip title={`Expires: ${formatDate(staff.allergenExpiry)}`}>
                              <Chip
                                label={formatDate(staff.allergen)}
                                size="small"
                                color={daysUntil(staff.allergenExpiry) < 90 ? "warning" : "success"}
                              />
                            </Tooltip>
                          ) : (
                            <Chip label="Required" size="small" color="error" />
                          )}
                        </TableCell>
                        <TableCell>
                          {staff.firstAid ? (
                            <Tooltip title={`Expires: ${formatDate(staff.firstAidExpiry)}`}>
                              <Chip label={formatDate(staff.firstAid)} size="small" color="success" />
                            </Tooltip>
                          ) : (
                            <Chip label="N/A" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={staff.status}
                            size="small"
                            color={staff.status === "compliant" ? "success" : "warning"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        )}

        {/* Allergens Tab */}
        {activeTabLabel === "Allergens" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Allergen Management - Natasha's Law
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => alert("Add new dish dialog - coming soon")}
              >
                Add Dish
              </Button>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }} icon={<AlertTriangle size={18} />}>
              <strong>Natasha's Law (2021):</strong> All pre-packed for direct sale (PPDS) food must display full ingredient lists with allergens emphasized.
            </Alert>

            <Stack spacing={3}>
              {data.allergens.menu.map((item: any) => (
                <Card key={item.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2, gap: 1 }}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {item.dish}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.category}
                        </Typography>
                      </Box>
                      {item.natashasLaw && (
                        <Chip label="PPDS" size="small" color="success" icon={<CheckCircle size={14} />} sx={{ flexShrink: 0 }} />
                      )}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                        Contains Allergens:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {item.allergens.map((allergen: string) => (
                          <Chip
                            key={allergen}
                            label={allergen}
                            size="small"
                            sx={{ bgcolor: alpha("#ef4444", 0.1), color: "#ef4444", fontWeight: 600 }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                        Ingredients:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.ingredients.join(", ")}
                      </Typography>
                    </Box>

                    {item.ppds && (
                      <Paper sx={{ p: 1.5, mb: 2, boxShadow: "none", border: "1px solid", borderColor: "divider", bgcolor: alpha("#10b981", 0.02) }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 0.5 }}>
                          PPDS Label:
                        </Typography>
                        <Typography variant="body2">{item.ppds}</Typography>
                      </Paper>
                    )}

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Edit size={14} />}
                        onClick={() => alert(`Edit ${item.dish}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Remove ${item.dish} from allergen records?`)) {
                            alert(`${item.dish} removed.`);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Suppliers Tab */}
        {activeTabLabel === "Suppliers" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Supplier Management & Traceability
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setShowAddSupplier(true)}
              >
                Add Supplier
              </Button>
            </Box>
            {data.suppliers.length === 0 ? (
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <EmptyState
                  icon={Package}
                  title="No Suppliers Added"
                  description="Start managing your supplier relationships. Track audits, documents, and ensure your supply chain meets compliance standards."
                  actionLabel="Add First Supplier"
                  onAction={() => alert("Add supplier")}
                />
              </Card>
            ) : (
              <Stack spacing={3}>
                {data.suppliers.map((supplier: any) => (
                <Card key={supplier.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {supplier.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {supplier.category}
                        </Typography>
                      </Box>
                      <Chip
                        label={supplier.status}
                        size="small"
                        color={supplier.status === "approved" ? "success" : "warning"}
                      />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2, mb: 2 }}>
                      <Box key="last-audit">
                        <Typography variant="caption" color="text.secondary">
                          Last Audit
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {supplier.lastAudit ? formatDate(supplier.lastAudit) : "N/A"}
                        </Typography>
                      </Box>
                      <Box key="next-audit">
                        <Typography variant="caption" color="text.secondary">
                          Next Audit
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(supplier.nextAudit)}
                        </Typography>
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                      <Chip icon={<Paperclip size={12} />} label={`${supplier.documents} docs`} size="small" />
                      {supplier.rating && (
                        <Chip icon={<Star size={12} />} label={`${supplier.rating}/5.0`} size="small" color="primary" />
                      )}
                    </Stack>

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Button size="small" startIcon={<Mail size={14} />} href={`mailto:${supplier.contact}`}>
                        Email
                      </Button>
                      <Button size="small" startIcon={<Phone size={14} />} href={`tel:${supplier.phone}`}>
                        Call
                      </Button>
                      <Button size="small" startIcon={<FileText size={14} />}>
                        View Docs
                      </Button>
                      <Box sx={{ flex: 1 }} />
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${supplier.name}? This action cannot be undone.`)) {
                            alert(`${supplier.name} has been deleted.`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
            )}
          </Box>
        )}

        {/* Incidents Tab */}
        {activeTabLabel === "Incidents" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Incidents & Complaints
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setShowAddIncident(true)}
              >
                Log Incident
              </Button>
            </Box>
            {data.incidents.length === 0 ? (
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <EmptyState
                  icon={AlertCircle}
                  title="No Incidents Logged"
                  description="Track food safety incidents, customer complaints, and near-misses. Logging incidents helps identify patterns and prevent future issues."
                  actionLabel="Log First Incident"
                  onAction={() => alert("Log incident")}
                />
              </Card>
            ) : (
              <Stack spacing={3}>
                {data.incidents.map((incident: any) => (
                <Card key={incident.id} sx={{ boxShadow: "none", border: `1px solid ${incident.severity === "high" ? alpha("#ef4444", 0.3) : incident.severity === "medium" ? alpha("#f59e0b", 0.3) : alpha("#64748b", 0.3)}`, bgcolor: incident.severity === "high" ? alpha("#ef4444", 0.02) : incident.severity === "medium" ? alpha("#f59e0b", 0.02) : "white" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {incident.type}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(incident.date)} • Assigned to: {incident.assignedTo}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={incident.severity}
                          size="small"
                          sx={{
                            bgcolor: incident.severity === "high" ? alpha("#ef4444", 0.1) : incident.severity === "medium" ? alpha("#f59e0b", 0.1) : alpha("#64748b", 0.1),
                            color: incident.severity === "high" ? "#ef4444" : incident.severity === "medium" ? "#f59e0b" : "#64748b",
                            fontWeight: 600,
                          }}
                        />
                        <Chip
                          label={incident.status}
                          size="small"
                          color={incident.status === "resolved" ? "success" : "warning"}
                        />
                      </Stack>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {incident.description}
                    </Typography>

                    {incident.resolution && (
                      <Paper sx={{ p: 1.5, mb: 2, boxShadow: "none", border: "1px solid", borderColor: "divider", bgcolor: alpha("#10b981", 0.02) }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 0.5 }}>
                          Resolution:
                        </Typography>
                        <Typography variant="body2">{incident.resolution}</Typography>
                      </Paper>
                    )}

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Edit size={14} />}
                        onClick={() => alert(`Edit incident: ${incident.type}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Delete this incident record? This cannot be undone.`)) {
                            alert(`Incident "${incident.type}" deleted.`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
            )}
          </Box>
        )}

        {/* Equipment Tab */}
        {activeTabLabel === "Equipment" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Equipment Maintenance Register
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setShowAddEquipment(true)}
              >
                Add Equipment
              </Button>
            </Box>
            <Stack spacing={3}>
              {data.equipment.map((item: any) => (
                <Card key={item.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2, gap: 1 }}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.manufacturer} {item.model} • S/N: {item.serial}
                        </Typography>
                      </Box>
                      <Chip
                        label={item.status}
                        size="small"
                        color={item.status === "compliant" ? "success" : "warning"}
                        sx={{ flexShrink: 0 }}
                      />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, gap: 2, mb: 2 }}>
                      <Box key="last-service">
                        <Typography variant="caption" color="text.secondary">
                          Last Service
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(item.lastService)}
                        </Typography>
                      </Box>
                      <Box key="next-service">
                        <Typography variant="caption" color="text.secondary">
                          Next Service
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(item.nextService)}
                        </Typography>
                      </Box>
                      <Box key="warranty">
                        <Typography variant="caption" color="text.secondary">
                          Warranty Until
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(item.warranty)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Button
                        size="small"
                        startIcon={<Calendar size={14} />}
                        onClick={() => alert('Schedule service functionality - coming soon')}
                      >
                        Schedule
                      </Button>
                      <Button
                        size="small"
                        startIcon={<FileText size={14} />}
                        onClick={() => alert('View service history functionality - coming soon')}
                      >
                        History
                      </Button>
                      <Box sx={{ flex: 1 }} />
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Remove ${item.name} from equipment register?`)) {
                            alert(`${item.name} removed.`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Recipes Tab */}
        {activeTabLabel === "Recipes" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recipe & Menu Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setShowAddRecipe(true)}
              >
                Add Recipe
              </Button>
            </Box>
            <Stack spacing={3}>
              {data.recipes.map((recipe: any) => (
                <Card key={recipe.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2, gap: 1 }}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {recipe.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {recipe.category} • Serves {recipe.servings}
                        </Typography>
                      </Box>
                      <Chip label={isOwner ? `${recipe.margin}% margin` : recipe.category} size="small" color="success" sx={{ flexShrink: 0 }} />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: isOwner ? "repeat(4, 1fr)" : "repeat(2, 1fr)" }, gap: 2, mb: 2 }}>
                      {isOwner && <Box key="cost">
                        <Typography variant="caption" color="text.secondary">
                          Cost
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          £{recipe.cost.toFixed(2)}
                        </Typography>
                      </Box>}
                      {isOwner && <Box key="sell-price">
                        <Typography variant="caption" color="text.secondary">
                          Sell Price
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          £{recipe.sellPrice.toFixed(2)}
                        </Typography>
                      </Box>}
                      <Box key="prep-time">
                        <Typography variant="caption" color="text.secondary">
                          Prep Time
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {recipe.prepTime} mins
                        </Typography>
                      </Box>
                      <Box key="cook-time">
                        <Typography variant="caption" color="text.secondary">
                          Cook Time
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {recipe.cookTime} mins
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                        Allergens:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {recipe.allergens.map((allergen: string) => (
                          <Chip key={allergen} label={allergen} size="small" sx={{ bgcolor: alpha("#ef4444", 0.1), color: "#ef4444" }} />
                        ))}
                      </Stack>
                    </Box>

                    <Paper sx={{ p: 1.5, mb: 2, boxShadow: "none", border: "1px solid", borderColor: "divider", bgcolor: alpha("#6366f1", 0.02) }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 0.5 }}>
                        Nutrition (per serving):
                      </Typography>
                      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        <Typography variant="caption">{recipe.nutrition.calories} kcal</Typography>
                        <Typography variant="caption">{recipe.nutrition.protein}g protein</Typography>
                        <Typography variant="caption">{recipe.nutrition.carbs}g carbs</Typography>
                        <Typography variant="caption">{recipe.nutrition.fat}g fat</Typography>
                      </Stack>
                    </Paper>

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<Edit size={14} />}
                        onClick={() => alert(`Edit ${recipe.name}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Delete recipe "${recipe.name}"? This cannot be undone.`)) {
                            alert(`${recipe.name} deleted.`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Traceability Tab */}
        {activeTabLabel === "Traceability" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Traceability & Recall Management
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => alert("Add batch entry - coming soon")}
              >
                Add Batch
              </Button>
            </Box>
            <Stack spacing={3}>
              {data.traceability.map((item: any) => (
                <Card key={item.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2, gap: 1 }}>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {item.product}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Batch: {item.batch} • Supplier: {item.supplier}
                        </Typography>
                      </Box>
                      <Chip label={item.status} size="small" color="success" sx={{ flexShrink: 0 }} />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" }, gap: 2, mb: 2 }}>
                      <Box key="received">
                        <Typography variant="caption" color="text.secondary">
                          Received
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(item.received)}
                        </Typography>
                      </Box>
                      <Box key="expiry">
                        <Typography variant="caption" color="text.secondary">
                          Expiry
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatDate(item.expiry)}
                        </Typography>
                      </Box>
                      <Box key="quantity">
                        <Typography variant="caption" color="text.secondary">
                          Quantity
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.quantity}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                        Used In:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {item.usedIn.map((dish: string) => (
                          <Chip key={dish} label={dish} size="small" />
                        ))}
                      </Stack>
                    </Box>

                    <Box sx={{ pt: 1.5, borderTop: "1px solid", borderColor: "divider", display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      <Button
                        size="small"
                        startIcon={<AlertTriangle size={14} />}
                        onClick={() => alert(`Simulating recall for batch ${item.batch}...`)}
                      >
                        Simulate Recall
                      </Button>
                      <Box sx={{ flex: 1 }} />
                      <Button
                        size="small"
                        color="error"
                        startIcon={<X size={14} />}
                        onClick={() => {
                          if (window.confirm(`Delete batch record ${item.batch}?`)) {
                            alert(`Batch ${item.batch} deleted.`);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Sustainability Tab */}
        {activeTabLabel === "Sustainability" && (
          <Box>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2 }, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Sustainability & ESG Tracking
              </Typography>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => setShowAddSustainability(true)}
              >
                Record Data
              </Button>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3, mb: 3 }}>
              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#ef4444", 0.1) }}>
                      <Wind size={20} color="#ef4444" />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.sustainability.carbon.monthly} {data.sustainability.carbon.unit}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Carbon Footprint (Monthly)
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Target: {data.sustainability.carbon.target} {data.sustainability.carbon.unit}
                    </Typography>
                    <Chip
                      label={`${data.sustainability.carbon.trend}%`}
                      size="small"
                      icon={<TrendingDown size={12} />}
                      sx={{ bgcolor: alpha("#10b981", 0.1), color: "#10b981" }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(data.sustainability.carbon.monthly / data.sustainability.carbon.target) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#f59e0b", 0.1) }}>
                      <Zap size={20} color="#f59e0b" />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.sustainability.energy.monthly} {data.sustainability.energy.unit}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Energy Usage (Monthly)
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Target: {data.sustainability.energy.target} {data.sustainability.energy.unit}
                    </Typography>
                    <Chip
                      label={`${data.sustainability.energy.trend}%`}
                      size="small"
                      icon={<TrendingDown size={12} />}
                      sx={{ bgcolor: alpha("#10b981", 0.1), color: "#10b981" }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(data.sustainability.energy.monthly / data.sustainability.energy.target) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#06b6d4", 0.1) }}>
                      <Droplet size={20} color="#06b6d4" />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.sustainability.water.monthly} {data.sustainability.water.unit}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Water Usage (Monthly)
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Target: {data.sustainability.water.target} {data.sustainability.water.unit}
                    </Typography>
                    <Chip
                      label={`${data.sustainability.water.trend}%`}
                      size="small"
                      icon={<TrendingDown size={12} />}
                      sx={{ bgcolor: alpha("#10b981", 0.1), color: "#10b981" }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(data.sustainability.water.monthly / data.sustainability.water.target) * 100}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: alpha("#22c55e", 0.1) }}>
                      <Recycle size={20} color="#22c55e" />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {data.sustainability.waste.recyclingRate}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Recycling Rate
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {data.sustainability.waste.recycled}kg recycled of {data.sustainability.waste.monthly}kg total waste
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={data.sustainability.waste.recyclingRate}
                    sx={{ height: 6, borderRadius: 3, mt: 1 }}
                    color="success"
                  />
                </CardContent>
              </Card>
            </Box>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Local Sourcing
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#22c55e", mb: 1 }}>
                      {data.sustainability.localSourcing.percentage}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {data.sustainability.localSourcing.suppliers} local suppliers • Target: {data.sustainability.localSourcing.target}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={data.sustainability.localSourcing.percentage}
                      sx={{ height: 6, borderRadius: 3, mt: 2 }}
                      color="success"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Integrations Tab */}
        {activeTabLabel === "Integrations" && (
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Integration Hub
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3 }}>
              {data.integrations.map((integration: any) => (
                <Card key={integration.id} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Typography sx={{ fontSize: "2rem" }}>{integration.icon}</Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600 }}>
                          {integration.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)}
                        </Typography>
                      </Box>
                      <Chip
                        label={integration.status}
                        size="small"
                        color={integration.status === "connected" ? "success" : integration.status === "pending" ? "warning" : "default"}
                      />
                    </Box>
                    {integration.lastSync && (
                      <Typography variant="caption" color="text.secondary">
                        Last synced: {integration.lastSync}
                      </Typography>
                    )}
                    <Button
                      fullWidth
                      variant={integration.status === "connected" ? "outlined" : "contained"}
                      sx={{ mt: 2 }}
                      startIcon={integration.status === "connected" ? <Settings size={14} /> : <Wifi size={14} />}
                    >
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>

      {/* AI Assistant Drawer */}
      <Drawer
        anchor="right"
        open={showAI}
        onClose={() => setShowAI(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 420 }, display: "flex", flexDirection: "column" } }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <Bot size={18} color="white" />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                AI Compliance Assistant
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Powered by Gemini
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setShowAI(false)} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {chatMessages.length === 0 && (
            <Paper sx={{ p: 2, boxShadow: "none", border: "1px solid", borderColor: "divider", bgcolor: alpha("#6366f1", 0.02) }}>
              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                Hi! Ask me anything about UK food compliance:
              </Typography>
              <Stack spacing={0.75}>
                {[
                  "What temperature should chicken be cooked to?",
                  "Explain Natasha's Law in 2 sentences",
                  "Which of my items are expiring soon?",
                  "What's needed for a 5-star FHRS rating?",
                ].map((q) => (
                  <Box
                    key={q}
                    onClick={() => setChatInput(q)}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      bgcolor: "white",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": { bgcolor: alpha("#6366f1", 0.04), borderColor: alpha("#6366f1", 0.3) },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#6366f1" }}>
                      {q}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          )}

          {chatMessages.map((m, idx) => (
            <Box
              key={idx}
              sx={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                p: 1.5,
                borderRadius: 2,
                bgcolor: m.role === "user" ? "primary.main" : "#f3f4f6",
                color: m.role === "user" ? "white" : "text.primary",
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontSize: "0.875rem", lineHeight: 1.5 }}>
                {m.content}
              </Typography>
            </Box>
          ))}

          {chatLoading && (
            <Box sx={{ alignSelf: "flex-start", maxWidth: "85%", p: 1.5, borderRadius: 2, bgcolor: "#f3f4f6" }}>
              <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "text.secondary", fontStyle: "italic" }}>
                Thinking...
              </Typography>
            </Box>
          )}

          {chatError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {chatError}
            </Alert>
          )}
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", flexShrink: 0 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask anything..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendChat();
              }
            }}
            disabled={chatLoading}
            multiline
            maxRows={3}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleSendChat}
                    disabled={chatLoading || !chatInput.trim()}
                    color="primary"
                  >
                    <Send size={18} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {chatMessages.length > 0 && (
            <Button
              size="small"
              onClick={() => {
                setChatMessages([]);
                setChatError(null);
              }}
              sx={{ mt: 1, fontSize: "0.75rem" }}
            >
              Clear conversation
            </Button>
          )}
        </Box>
      </Drawer>

      {/* AI Improvement Plan Dialog */}
      <Dialog
        open={improvementOpen}
        onClose={() => setImprovementOpen(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={typeof window !== "undefined" && window.innerWidth < 600}
      >
        <DialogTitle sx={{ pr: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
              <Target size={18} color="white" />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                AI Improvement Plan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Personalised recommendations
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setImprovementOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {improvementLoading && (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <LinearProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Analysing your compliance data...
              </Typography>
            </Box>
          )}
          {improvementError && (
            <Alert severity="error">{improvementError}</Alert>
          )}
          {improvementPlan && !improvementLoading && (
            <Stack spacing={2.5}>
              {improvementPlan.summary && (
                <Paper sx={{ p: 2, bgcolor: alpha("#6366f1", 0.04), boxShadow: "none", border: "1px solid", borderColor: alpha("#6366f1", 0.15) }}>
                  <Typography variant="body2">{improvementPlan.summary}</Typography>
                  {improvementPlan.currentScore && improvementPlan.targetScore && (
                    <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {improvementPlan.currentScore}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={(improvementPlan.currentScore / improvementPlan.targetScore) * 100}
                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: "#10b981" }}>
                        Target: {improvementPlan.targetScore}%
                      </Typography>
                    </Box>
                  )}
                </Paper>
              )}

              {improvementPlan.actions?.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Recommended Actions
                  </Typography>
                  <Stack spacing={1.5}>
                    {improvementPlan.actions.map((a: any, idx: number) => {
                      const colour = a.priority === "high" ? "#ef4444" : a.priority === "medium" ? "#f59e0b" : "#6366f1";
                      return (
                        <Card key={idx} sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider" }}>
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 1, mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                                {a.title}
                              </Typography>
                              <Chip
                                size="small"
                                label={a.priority}
                                sx={{ bgcolor: alpha(colour, 0.1), color: colour, fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {a.description}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              {a.category && <Chip size="small" label={a.category} variant="outlined" />}
                              {a.deadline && <Chip size="small" label={a.deadline} variant="outlined" />}
                              {a.estimatedImpact && (
                                <Chip
                                  size="small"
                                  label={a.estimatedImpact}
                                  sx={{ bgcolor: alpha("#10b981", 0.1), color: "#10b981", fontWeight: 600 }}
                                />
                              )}
                            </Stack>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {improvementPlan.quickWins?.length > 0 && (
                <Paper sx={{ p: 2, boxShadow: "none", border: "1px solid", borderColor: alpha("#10b981", 0.2), bgcolor: alpha("#10b981", 0.03) }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#10b981" }}>
                    Quick Wins
                  </Typography>
                  <Stack spacing={0.75}>
                    {improvementPlan.quickWins.map((q: string, idx: number) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckCircle size={14} color="#10b981" />
                        <Typography variant="body2">{q}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              )}

              {improvementPlan.raw && (
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.8rem" }}>
                  {improvementPlan.raw}
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImprovementOpen(false)}>Close</Button>
          {improvementPlan && !improvementLoading && (
            <Button variant="outlined" startIcon={<RefreshCw size={16} />} onClick={handleGenerateImprovement}>
              Regenerate
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Onboarding Wizard */}
      {showOnboarding && <OnboardingWizard onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />}

      {/* Floating AI Assistant Button */}
      <Tooltip title="Ask AI Assistant" placement="left">
        <Box
          onClick={() => setShowAI(true)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)",
            },
            zIndex: 1000,
          }}
        >
          <Bot size={30} color="white" />
        </Box>
      </Tooltip>

      {/* Form Dialogs */}
      {/* Add Temperature Equipment Dialog */}
      <Dialog open={showAddTemperature} onClose={() => setShowAddTemperature(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Temperature Monitoring Equipment</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Equipment Type</InputLabel>
              <Select label="Equipment Type" defaultValue="">
                <MenuItem key="fridge" value="Fridge">Fridge</MenuItem>
                <MenuItem key="freezer" value="Freezer">Freezer</MenuItem>
                <MenuItem key="display-fridge" value="Display Fridge">Display Fridge</MenuItem>
                <MenuItem key="hot-hold" value="Hot Hold">Hot Hold Cabinet</MenuItem>
                <MenuItem key="cold-hold" value="Cold Hold">Cold Hold Unit</MenuItem>
                <MenuItem key="walk-in" value="Walk-in">Walk-in Cooler</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Equipment Name" fullWidth required placeholder="e.g., Main Walk-in Fridge" />
            <TextField label="Location" fullWidth required placeholder="e.g., Kitchen, Prep Area" />
            <TextField label="Sensor ID" fullWidth required placeholder="e.g., TEMP-001" />
            <TextField label="Manufacturer" fullWidth placeholder="e.g., Williams, True" />
            <TextField label="Model Number" fullWidth />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField label="Min Temp (°C)" type="number" fullWidth required defaultValue="0" />
              <TextField label="Max Temp (°C)" type="number" fullWidth required defaultValue="5" />
            </Box>
            <TextField label="Current Reading (°C)" type="number" fullWidth step="0.1" placeholder="Enter initial reading" />
            <TextField label="Alert Threshold (°C)" type="number" fullWidth step="0.1" helperText="Alert if temperature exceeds this" />
            <TextField label="Notes" fullWidth multiline rows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddTemperature(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Temperature equipment added successfully! Readings will be monitored continuously.'); setShowAddTemperature(false); }}>
            Add Equipment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Licence Dialog */}
      <Dialog open={showAddLicence} onClose={() => setShowAddLicence(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Licence</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Licence Title" fullWidth required />
            <TextField label="Licence Number" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" defaultValue="">
                <MenuItem key="food-hygiene" value="Food Hygiene">Food Hygiene</MenuItem>
                <MenuItem key="alcohol" value="Alcohol">Alcohol Licence</MenuItem>
                <MenuItem key="music" value="Music">Music & Entertainment</MenuItem>
                <MenuItem key="outdoor" value="Outdoor">Outdoor Seating</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Issuing Authority" fullWidth required />
            <TextField label="Issue Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Expiry Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <Button variant="outlined" component="label" startIcon={<Upload size={18} />} fullWidth>
              Upload Certificate Document
              <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: -1 }}>
              Accepted formats: PDF, JPG, PNG (Max 10MB)
            </Typography>
            <TextField label="Notes" fullWidth multiline rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddLicence(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Licence added successfully!'); setShowAddLicence(false); }}>
            Add Licence
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Certificate Dialog */}
      <Dialog open={showAddCertificate} onClose={() => setShowAddCertificate(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Safety Certificate</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Certificate Title" fullWidth required />
            <TextField label="Equipment/Service" fullWidth required />
            <TextField label="Supplier/Inspector" fullWidth required />
            <TextField label="Last Service Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Next Due Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Certificate Number" fullWidth />
            <Button variant="outlined" component="label" startIcon={<Upload size={18} />} fullWidth>
              Upload Certificate Document
              <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" />
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: -1 }}>
              Accepted formats: PDF, JPG, PNG (Max 10MB)
            </Typography>
            <TextField label="Notes" fullWidth multiline rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddCertificate(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Certificate added successfully!'); setShowAddCertificate(false); }}>
            Add Certificate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Insurance Policy Dialog */}
      <Dialog open={showAddPolicy} onClose={() => setShowAddPolicy(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Insurance Policy</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Policy Title" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Insurance Type</InputLabel>
              <Select label="Insurance Type" defaultValue="">
                <MenuItem key="liability" value="Public Liability">Public Liability</MenuItem>
                <MenuItem key="employers" value="Employers Liability">Employers Liability</MenuItem>
                <MenuItem key="buildings" value="Buildings">Buildings Insurance</MenuItem>
                <MenuItem key="contents" value="Contents">Contents Insurance</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Provider" fullWidth required />
            <TextField label="Policy Number" fullWidth required />
            <TextField label="Coverage Amount (£)" type="number" fullWidth required />
            <TextField label="Issue Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Renewal Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Notes" fullWidth multiline rows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddPolicy(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Insurance policy added successfully!'); setShowAddPolicy(false); }}>
            Add Policy
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Environmental Contract Dialog */}
      <Dialog open={showAddEnvironmental} onClose={() => setShowAddEnvironmental(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Environmental Contract</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Contract Title" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Service Type</InputLabel>
              <Select label="Service Type" defaultValue="">
                <MenuItem key="waste" value="Waste Collection">Waste Collection</MenuItem>
                <MenuItem key="grease" value="Grease Trap">Grease Trap Cleaning</MenuItem>
                <MenuItem key="pest" value="Pest Control">Pest Control</MenuItem>
                <MenuItem key="recycling" value="Recycling">Recycling Service</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Provider/Contractor" fullWidth required />
            <TextField label="Contract Start" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Contract End" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Service Frequency" fullWidth placeholder="e.g., Weekly, Monthly" />
            <TextField label="Notes" fullWidth multiline rows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddEnvironmental(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Environmental contract added successfully!'); setShowAddEnvironmental(false); }}>
            Add Contract
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Operational Record Dialog */}
      <Dialog open={showAddOperational} onClose={() => setShowAddOperational(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Operational Record</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Record Title" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Record Type</InputLabel>
              <Select label="Record Type" defaultValue="">
                <MenuItem key="inspection" value="Health Inspection">Health Inspection</MenuItem>
                <MenuItem key="audit" value="Internal Audit">Internal Audit</MenuItem>
                <MenuItem key="assessment" value="Risk Assessment">Risk Assessment</MenuItem>
                <MenuItem key="review" value="Policy Review">Policy Review</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Inspector/Auditor" fullWidth required />
            <TextField label="Last Visit" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Next Visit" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Rating/Result" fullWidth />
            <TextField label="Notes & Actions" fullWidth multiline rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddOperational(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Operational record added successfully!'); setShowAddOperational(false); }}>
            Add Record
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Checklist Dialog */}
      <Dialog open={showAddChecklist} onClose={() => setShowAddChecklist(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Checklist</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Checklist Name" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" defaultValue="">
                <MenuItem key="opening" value="Opening">Opening Checklist</MenuItem>
                <MenuItem key="closing" value="Closing">Closing Checklist</MenuItem>
                <MenuItem key="cleaning" value="Cleaning">Cleaning Checklist</MenuItem>
                <MenuItem key="delivery" value="Delivery">Delivery Inspection</MenuItem>
                <MenuItem key="custom" value="Custom">Custom Checklist</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select label="Frequency" defaultValue="">
                <MenuItem key="daily" value="Daily">Daily</MenuItem>
                <MenuItem key="weekly" value="Weekly">Weekly</MenuItem>
                <MenuItem key="monthly" value="Monthly">Monthly</MenuItem>
                <MenuItem key="asneeded" value="As Needed">As Needed</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Assigned To" fullWidth />
            <TextField label="Description" fullWidth multiline rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddChecklist(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Checklist created successfully!'); setShowAddChecklist(false); }}>
            Create Checklist
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Staff Member Dialog */}
      <Dialog open={showAddStaff} onClose={() => setShowAddStaff(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Staff Member</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Full Name" fullWidth required />
            <TextField label="Job Title" fullWidth required />
            <TextField label="Employee ID" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Phone" fullWidth />
            <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <FormControl fullWidth>
              <InputLabel>Training Status</InputLabel>
              <Select label="Training Status" defaultValue="">
                <MenuItem key="compliant" value="Compliant">Compliant</MenuItem>
                <MenuItem key="due" value="Due Soon">Due Soon</MenuItem>
                <MenuItem key="overdue" value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Notes" fullWidth multiline rows={2} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddStaff(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Staff member added successfully!'); setShowAddStaff(false); }}>
            Add Staff
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog open={showAddSupplier} onClose={() => setShowAddSupplier(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Supplier</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Supplier Name" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" defaultValue="">
                <MenuItem key="produce" value="Fresh Produce">Fresh Produce</MenuItem>
                <MenuItem key="meat" value="Meat & Poultry">Meat & Poultry</MenuItem>
                <MenuItem key="dairy" value="Dairy">Dairy</MenuItem>
                <MenuItem key="dry" value="Dry Goods">Dry Goods</MenuItem>
                <MenuItem key="beverages" value="Beverages">Beverages</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Contact Person" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Phone" fullWidth />
            <TextField label="Last Audit" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Next Audit" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <FormControl fullWidth>
              <InputLabel>Approval Status</InputLabel>
              <Select label="Approval Status" defaultValue="">
                <MenuItem key="approved" value="Approved">Approved</MenuItem>
                <MenuItem key="pending" value="Pending">Pending Review</MenuItem>
                <MenuItem key="audit" value="Audit Due">Audit Due</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddSupplier(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Supplier added successfully!'); setShowAddSupplier(false); }}>
            Add Supplier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Log Incident Dialog */}
      <Dialog open={showAddIncident} onClose={() => setShowAddIncident(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Log Incident</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Incident Title" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" defaultValue="">
                <MenuItem key="complaint" value="Customer Complaint">Customer Complaint</MenuItem>
                <MenuItem key="foodborne" value="Foodborne Illness">Foodborne Illness</MenuItem>
                <MenuItem key="contamination" value="Contamination">Contamination</MenuItem>
                <MenuItem key="injury" value="Staff Injury">Staff Injury</MenuItem>
                <MenuItem key="allergy" value="Allergy Incident">Allergy Incident</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select label="Severity" defaultValue="">
                <MenuItem key="low" value="Low">Low</MenuItem>
                <MenuItem key="medium" value="Medium">Medium</MenuItem>
                <MenuItem key="high" value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Date of Incident" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Reported By" fullWidth required />
            <TextField label="Description" fullWidth multiline rows={4} required />
            <TextField label="Immediate Action Taken" fullWidth multiline rows={3} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddIncident(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Incident logged successfully!'); setShowAddIncident(false); }}>
            Log Incident
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Equipment Dialog */}
      <Dialog open={showAddEquipment} onClose={() => setShowAddEquipment(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Equipment</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Equipment Name" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select label="Type" defaultValue="">
                <MenuItem key="refrigeration" value="Refrigeration">Refrigeration</MenuItem>
                <MenuItem key="cooking" value="Cooking">Cooking Equipment</MenuItem>
                <MenuItem key="ventilation" value="Ventilation">Ventilation</MenuItem>
                <MenuItem key="safety" value="Safety">Safety Equipment</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Manufacturer" fullWidth />
            <TextField label="Model Number" fullWidth />
            <TextField label="Serial Number" fullWidth />
            <TextField label="Purchase Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Last Service" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Next Service Due" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
            <TextField label="Warranty Expiry" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddEquipment(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Equipment added successfully!'); setShowAddEquipment(false); }}>
            Add Equipment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Recipe Dialog */}
      <Dialog open={showAddRecipe} onClose={() => setShowAddRecipe(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Recipe</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Recipe Name" fullWidth required />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" defaultValue="">
                <MenuItem key="appetizer" value="Appetizer">Appetizer</MenuItem>
                <MenuItem key="main" value="Main Course">Main Course</MenuItem>
                <MenuItem key="dessert" value="Dessert">Dessert</MenuItem>
                <MenuItem key="beverage" value="Beverage">Beverage</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Serving Size" fullWidth required />
            <TextField label="Prep Time (minutes)" type="number" fullWidth />
            <TextField label="Cook Time (minutes)" type="number" fullWidth />
            <TextField label="Cost per Portion (£)" type="number" fullWidth />
            <TextField label="Sell Price (£)" type="number" fullWidth />
            <TextField label="Ingredients" fullWidth multiline rows={4} placeholder="List ingredients..." />
            <TextField label="Instructions" fullWidth multiline rows={4} placeholder="Cooking instructions..." />
            <TextField label="Allergens" fullWidth placeholder="e.g., Dairy, Gluten, Nuts" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddRecipe(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Recipe added successfully!'); setShowAddRecipe(false); }}>
            Add Recipe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Record Temperature Reading Dialog */}
      <Dialog open={showRecordReading} onClose={() => setShowRecordReading(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Temperature Reading</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Select Equipment</InputLabel>
              <Select label="Select Equipment" defaultValue="">
                {data.temperatures.map((temp: any) => (
                  <MenuItem key={temp.id} value={temp.id}>
                    {temp.equipment} - {temp.location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Temperature Reading (°C)"
              type="number"
              fullWidth
              required
              step="0.1"
              placeholder="Enter current temperature"
              InputProps={{
                endAdornment: <InputAdornment position="end">°C</InputAdornment>,
              }}
            />
            <TextField
              label="Reading Time"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              defaultValue={new Date().toISOString().slice(0, 16)}
            />
            <TextField label="Recorded By" fullWidth required defaultValue="Sarah Mitchell" />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="normal">
                <MenuItem key="normal" value="normal">Normal - Within Range</MenuItem>
                <MenuItem key="alert" value="alert">Alert - Out of Range</MenuItem>
                <MenuItem key="corrective" value="corrective">Corrective Action Taken</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Notes / Corrective Actions" fullWidth multiline rows={3} placeholder="Add any notes or corrective actions taken..." />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRecordReading(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Temperature reading recorded successfully!'); setShowRecordReading(false); }}>
            Record Reading
          </Button>
        </DialogActions>
      </Dialog>

      {/* Record Sustainability Data Dialog */}
      <Dialog open={showAddSustainability} onClose={() => setShowAddSustainability(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Record Sustainability Data</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Carbon Footprint</Typography>
            <TextField
              label="Carbon Emissions (kg CO₂e)"
              type="number"
              fullWidth
              step="0.01"
              placeholder="Monthly carbon emissions"
            />

            <Divider />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Energy Usage</Typography>
            <TextField
              label="Electricity (kWh)"
              type="number"
              fullWidth
              step="0.1"
              placeholder="Monthly electricity consumption"
            />
            <TextField
              label="Gas (kWh)"
              type="number"
              fullWidth
              step="0.1"
              placeholder="Monthly gas consumption"
            />

            <Divider />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Water Usage</Typography>
            <TextField
              label="Water Consumption (Liters)"
              type="number"
              fullWidth
              step="1"
              placeholder="Monthly water usage"
            />

            <Divider />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Waste Management</Typography>
            <TextField
              label="Total Waste (kg)"
              type="number"
              fullWidth
              step="0.1"
              placeholder="Total waste generated"
            />
            <TextField
              label="Recycled Waste (kg)"
              type="number"
              fullWidth
              step="0.1"
              placeholder="Amount recycled"
            />
            <TextField
              label="Food Waste (kg)"
              type="number"
              fullWidth
              step="0.1"
              placeholder="Food waste amount"
            />

            <Divider />
            <TextField
              label="Recording Period"
              type="month"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              defaultValue={new Date().toISOString().slice(0, 7)}
            />
            <TextField label="Notes" fullWidth multiline rows={2} placeholder="Any additional sustainability notes..." />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddSustainability(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { alert('Sustainability data recorded successfully!'); setShowAddSustainability(false); }}>
            Record Data
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Alert({ severity, icon, children }: any) {
  const colors: any = {
    warning: { bg: alpha("#f59e0b", 0.06), border: alpha("#f59e0b", 0.2), text: "#f59e0b" },
    info: { bg: alpha("#6366f1", 0.06), border: alpha("#6366f1", 0.2), text: "#6366f1" },
    success: { bg: alpha("#10b981", 0.06), border: alpha("#10b981", 0.2), text: "#10b981" },
  };

  const color = colors[severity];

  return (
    <Paper sx={{ p: 2.5, bgcolor: color.bg, border: `1px solid ${color.border}`, boxShadow: "none", borderRadius: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <Box sx={{ color: color.text, display: "flex", pt: 0.25 }}>{icon}</Box>
        <Typography variant="body2" sx={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{children}</Typography>
      </Box>
    </Paper>
  );
}
