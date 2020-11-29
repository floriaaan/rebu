import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ReceiptScreen from "./screens/ReceiptScreen";
import SearchScreen from "./screens/SearchScreen";

export const routes = [
  {
    name: "Home",
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: "Receipt",
    component: ReceiptScreen,
    options: { headerShown: false },
  },
  {
    name: "Search",
    component: SearchScreen,
    options: { headerShown: false },
  },
];

export const authentication = [
  {
    name: "Login",
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: "Register",
    component: RegisterScreen,
    options: { headerShown: false },
  },
  {
    name: "Forgot",
    component: LoginScreen,
    options: { headerShown: false },
  },
];
