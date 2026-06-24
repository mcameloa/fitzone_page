import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

let app = null;
let auth = null;
let db = null;

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  if (!app) app = initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  if (!auth) auth = getAuth(getFirebaseApp());
  return auth;
}

export function getFirestoreDb() {
  if (!isFirebaseConfigured()) return null;
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}
