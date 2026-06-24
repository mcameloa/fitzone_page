import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirebaseAuth } from "./firebase-client.js";

let currentUser = null;
const listeners = new Set();

export function onAuthChange(callback) {
  listeners.add(callback);
  callback(currentUser);
  return () => listeners.delete(callback);
}

function notify() {
  listeners.forEach((cb) => cb(currentUser));
}

export function getCurrentUser() {
  return currentUser;
}

export function initAuth() {
  const auth = getFirebaseAuth();
  if (!auth) {
    currentUser = null;
    notify();
    return;
  }
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    notify();
  });
}

export async function register(email, password, displayName) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase no está configurado. Copia firebase-config.example.js a firebase-config.js.");
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && cred.user) {
    // displayName stored client-side only for TSP scope
  }
  return cred.user;
}

export async function login(email, password) {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase no está configurado. Copia firebase-config.example.js a firebase-config.js.");
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logout() {
  const auth = getFirebaseAuth();
  if (auth) await signOut(auth);
}

export function isLoggedIn() {
  return !!currentUser;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}
