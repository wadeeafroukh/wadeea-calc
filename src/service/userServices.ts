import axios from "axios";
import { User } from "../interface/User";
import { jwtDecode } from "jwt-decode";

const api: string = process.env.REACT_APP_API + "/users";

export async function login(data: ILoginData): Promise<string> {
  const response = await axios.post(api + "/login", data);
  return response.data;
}

interface ILoginData {
  email: string;
  password: string;
}
const TOKEN_KEY = "token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function logOut() {
  localStorage.removeItem(TOKEN_KEY);
}
export async function register(user: User) {
  const response = await axios.post(api, user);
  return response.data;
}
interface IUserData {
  _id: string;
  isAdmin: boolean;
}
export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;
  const userData = jwtDecode<IUserData>(token);
  if (userData) {
    return { _id: userData._id, isAdmin: userData.isAdmin };
  } else {
    return null;
  }
}

export function isLoggedIn(): boolean {
  const user = getUserFromToken();
  return user !== null;
}
