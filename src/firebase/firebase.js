// Importar as funções necessárias do SDK do Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importar o Firestore

// Configuração do seu app Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCU1degov8Dcpv8UfSYq6a5XTFlq0IcKGQ',
  authDomain: 'mecanicarff.firebaseapp.com',
  projectId: 'mecanicarff',
  storageBucket: 'mecanicarff.appspot.com',
  messagingSenderId: '883980700771',
  appId: '1:883980700771:web:a0dce92f06f26578e63c56',
  measurementId: 'G-9G7N1HDR9X',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializar o Firestore

export { app, auth, db }; // Exportar a instância do Firestore
