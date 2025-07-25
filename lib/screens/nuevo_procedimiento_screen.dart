import 'package:bitacora_carabineros/models/procedimiento_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

class FirestoreService {
  final CollectionReference _procedimientosCollection =
      FirebaseFirestore.instance.collection('procedimientos');

  /// Agrega un nuevo procedimiento a la colección de Firestore.
  ///
  /// Si ocurre un error durante la operación, este método lanzará una excepción
  /// que debe ser manejada por quien lo llama (en este caso, la UI).
  Future<void> addProcedimiento(Procedimiento procedimiento) async {
    try {
      // El método .add devuelve un Future. Usamos 'await' para esperar a que se complete.
      // Si hay un error (ej. por reglas de seguridad de Firestore), se lanzará una excepción.
      await _procedimientosCollection.add(procedimiento.toMap());
    } catch (e) {
      // Es una buena práctica registrar el error para fines de depuración.
      debugPrint("Falló al agregar procedimiento: $e");

      // Relanzamos el error para que la capa superior (la pantalla) pueda saber
      // que la operación falló y mostrar un mensaje al usuario.
      rethrow;
    }
  }
}
