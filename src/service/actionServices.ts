import axios from "axios";
import { Action, Debt } from "../interface/Action";

const api: string = process.env.REACT_APP_API + "/actions";
const TOKEN_KEY = "token";
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function getActions() {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(api, { headers: { "x-auth-token": token } });
  return response.data;
}

export async function addAction(action: Action) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.post(api, action, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function updateAction(actionId: string, action: Action) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.put(`${api}/${actionId}`, action, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function deleteAction(actionId: string) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.delete(`${api}/${actionId}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}
// functions tire 2 for the later use of the app, not used in the first version
export async function getActionById(actionId: string) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(`${api}/${actionId}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function patchAction(actionId: string, action: Partial<Action>) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.patch(`${api}/${actionId}`, action, {
    headers: { "x-auth-token": token },
  });

  return response.data;
}
// stats page requests
const apiStats: string = process.env.REACT_APP_API + "/stats";
export async function getStats() {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(apiStats, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

// debt payment functions
const apiDebts: string = process.env.REACT_APP_API + "/debts";
export async function getDebts() {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(apiDebts, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function addDebt(debt: Debt) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.post(apiDebts, debt, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function updateDebt(debtId: string, debt: Debt) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.put(`${apiDebts}/${debtId}`, debt, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}

export async function deleteDebt(debtId: string) {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.delete(`${apiDebts}/${debtId}`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
}
