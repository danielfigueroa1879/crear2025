import 'package:bitacora_carabineros/models/procedimiento_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirestoreService {
  final CollectionReference _procedimientosCollection =
      FirebaseFirestore.instance.collection('procedimientos');

  Future<void> addProcedimiento(Procedimiento procedimiento) {
    return _procedimientosCollection
        .add(procedimiento.toMap())
        .catchError((error) => print("Falló al agregar procedimiento: $error"));
  }
}