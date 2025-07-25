import 'package:bitacora_carabineros/firebase_options.dart';
import 'package:bitacora_carabineros/screens/nuevo_procedimiento_screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

void main() async {
  // Asegúrate de que los widgets de Flutter estén inicializados
  WidgetsFlutterBinding.ensureInitialized();
  // Inicializa Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bitácora de Procedimientos',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.green.shade600,
        scaffoldBackgroundColor: Colors.grey[900],
        colorScheme: ColorScheme.dark(
            primary: Colors.green.shade400, secondary: Colors.teal.shade300),
      ),
      home: const NuevoProcedimientoScreen(),
    );
  }
}
