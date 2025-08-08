  import { ApplicationConfig, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideHttpClient } from '@angular/common/http';
  import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
  import { getAuth, provideAuth} from '@angular/fire/auth'
  import { getFirestore, provideFirestore } from '@angular/fire/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyCAyQGjBMJk1YX88PA_p5-K4yEVAhiHHXc",
    authDomain: "my-adventure-game-72d3c.firebaseapp.com",
    projectId: "my-adventure-game-72d3c",
    storageBucket: "my-adventure-game-72d3c.firebasestorage.app",
    messagingSenderId: "405319385468",
    appId: "1:405319385468:web:9eedb05b65ce07197464f9"
  };

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(),      
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(()=>getAuth()),
        provideFirestore(()=>getFirestore())
      
    ],
  };
