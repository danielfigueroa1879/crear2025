import 'package:cloud_firestore/cloud_firestore.dart';

enum EstadoProcedimiento { recibido, enRuta, enElLugar, finalizado, cancelado }

class Procedimiento {
  final String? id;
  final DateTime horaIngreso;
  final String cuadrante;
  final String direccion;
  final String? personaEntrevistada;
  final String resultado;
  final String carabineroId;
  final EstadoProcedimiento estado;
  final List<String> fotosUrls;

  Procedimiento({
    this.id,
    required this.horaIngreso,
    required this.cuadrante,
    required this.direccion,
    this.personaEntrevistada,
    required this.resultado,
    required this.carabineroId,
    this.estado = EstadoProcedimiento.recibido,
    this.fotosUrls = const [],
  });

  Map<String, dynamic> toMap() {
    return {
      'horaIngreso': Timestamp.fromDate(horaIngreso),
      'cuadrante': cuadrante,
      'direccion': direccion,
      'personaEntrevistada': personaEntrevistada,
      'resultado': resultado,
      'carabineroId': carabineroId,
      'estado': estado.toString().split('.').last,
      'fotosUrls': fotosUrls,
    };
  }

  factory Procedimiento.fromMap(Map<String, dynamic> map, String documentId) {
    return Procedimiento(
      id: documentId,
      horaIngreso: (map['horaIngreso'] as Timestamp).toDate(),
      cuadrante: map['cuadrante'] ?? '',
      direccion: map['direccion'] ?? '',
      personaEntrevistada: map['personaEntrevistada'],
      resultado: map['resultado'] ?? '',
      carabineroId: map['carabineroId'] ?? '',
      estado: _estadoFromString(map['estado']),
      fotosUrls: List<String>.from(map['fotosUrls'] ?? []),
    );
  }

  static EstadoProcedimiento _estadoFromString(String? estadoStr) {
    return EstadoProcedimiento.values.firstWhere(
      (e) => e.toString().split('.').last == estadoStr,
      orElse: () => EstadoProcedimiento.recibido,
    );
  }
}
