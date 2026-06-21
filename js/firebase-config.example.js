/** Copia este archivo a firebase-config.js y reemplaza con tus credenciales de Firebase Console. */
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export function isFirebaseConfigured() {
  return firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("YOUR_");
}
