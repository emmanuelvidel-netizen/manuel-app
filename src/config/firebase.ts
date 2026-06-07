import { FirebaseOptions } from 'firebase/app';

// Reemplaza con tus credenciales de Firebase
export const firebaseConfig: FirebaseOptions = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  databaseURL: 'YOUR_DATABASE_URL', // Para Realtime Database
};

export const socketConfig = {
  url: 'YOUR_SOCKET_SERVER_URL', // e.g., 'https://your-socket-server.com'
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
};
