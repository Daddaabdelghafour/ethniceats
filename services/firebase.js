// ============================================================
//  EthnicEats — services/firebase.js
//  Initialisation Firebase (SDK v9+ modulaire via CDN)
//
//  UTILISATION :
//    <script type="module" src="services/firebase.js"></script>
//  ou importé dans un autre module :
//    import { app, auth, db, rtdb } from './services/firebase.js';
// ============================================================

import { initializeApp }        from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth }              from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore }         from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getDatabase }          from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// ------------------------------------------------------------
//  Configuration Firebase
//  → Remplace chaque valeur par tes propres clés disponibles
//    dans la console Firebase :
//    https://console.firebase.google.com → Paramètres du projet
//    → Tes applications → SDK Firebase → Objet firebaseConfig
// ------------------------------------------------------------
const firebaseConfig = {
  apiKey:            "AIzaSyAvHYHrIXdorWNlynzTfOrPFWqEB3V5sgk",
  authDomain:        "ethniceats-ecd3a.firebaseapp.com",       // ex : my-app.firebaseapp.com
  projectId:         "ethniceats-ecd3a",
  storageBucket:     "ethniceats-ecd3a.firebasestorage.app",    // ex : my-app.appspot.com
  messagingSenderId: "420965344243",
  appId:             "1:420965344243:web:6d7066677d2d043a646886",

  // ⚠️  IMPORTANT — Realtime Database :
  //  Colle ici l'URL de ta Realtime Database.
  //  Tu la trouves dans Firebase Console → Realtime Database → Données
  //  Format habituel : https://<project-id>-default-rtdb.firebaseio.com
  //  (ou la région Europe)  : https://<project-id>-default-rtdb.europe-west1.firebasedatabase.app
  databaseURL:       "https://ethniceats-ecd3a-default-rtdb.europe-west1.firebasedatabase.app/",
};

// ------------------------------------------------------------
//  Initialisation des services Firebase
// ------------------------------------------------------------
const app  = initializeApp(firebaseConfig);  // Firebase App (point d'entrée)
const auth = getAuth(app);                   // Authentication
const db   = getFirestore(app);              // Firestore (base de données NoSQL)
const rtdb = getDatabase(app);              // Realtime Database

// ------------------------------------------------------------
//  Exports — consommés par les modèles / contrôleurs MVC
// ------------------------------------------------------------
export { app, auth, db, rtdb };
