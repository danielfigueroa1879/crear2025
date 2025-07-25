// File: lib/firebase_options.dart

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// **CRUCIAL:** Reemplaza los valores de este archivo con las credenciales
/// de la configuración de la aplicación web de TU PROPIO proyecto de Firebase.
///
/// CÓMO OBTENER TUS CREDENCIALES:
/// 1. Ve a la consola de Firebase: https://console.firebase.google.com/
/// 2. Selecciona tu proyecto.
/// 3. Ve a "Configuración del proyecto" (el ícono de engranaje ⚙️ en el menú de la izquierda).
/// 4. En la pestaña "General", en la sección "Tus apps", selecciona o crea una app web.
/// 5. Busca el objeto de configuración `firebaseConfig` y copia los valores aquí.
///
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      // Esta es la configuración para la versión WEB de tu app.
      return web;
    }
    // El resto de esta lógica es para plataformas móviles, que no están configuradas.
    // Puedes ignorarlo si solo estás desarrollando para la web.
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for android - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.iOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for iOS - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  /// **▼▼▼ REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO DE FIREBASE ▼▼▼**
  static const FirebaseOptions web = FirebaseOptions(
    apiKey: "AIzaSy...REEMPLAZA_CON_TU_API_KEY", // Reemplazar
    appId: "1:1234567890:web:REEMPLAZA_CON_TU_APP_ID", // Reemplazar
    messagingSenderId: "REEMPLAZA_CON_TU_SENDER_ID", // Reemplazar
    projectId: "REEMPLAZA_CON_TU_PROJECT_ID", // Reemplazar
    authDomain: "TU_PROJECT_ID.firebaseapp.com", // Reemplazar
    storageBucket: "TU_PROJECT_ID.appspot.com", // Reemplazar
  );
  /// **▲▲▲ REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO DE FIREBASE ▲▲▲**
}
