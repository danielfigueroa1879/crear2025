// File: lib/firebase_options.dart

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Estas son las credenciales para tu proyecto específico de Firebase.
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      // Configuración para la versión WEB de tu app.
      return web;
    }
    // La lógica para otras plataformas no está configurada.
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

  /// **▼▼▼ Configuración de Firebase para tu proyecto "bitacora-5f0fe" ▼▼▼**
  static const FirebaseOptions web = FirebaseOptions(
    apiKey: "AIzaSyCE98me59kyJr_bN5YI8sjDdFLznz6X3WE",
    appId: "1:810728555827:web:2c98a7f19e5620286c2a46",
    messagingSenderId: "810728555827",
    projectId: "bitacora-5f0fe",
    authDomain: "bitacora-5f0fe.firebaseapp.com",
    storageBucket: "bitacora-5f0fe.appspot.com",
  );
  /// **▲▲▲ ¡Esta configuración está lista para usar! ▲▲▲**
}
