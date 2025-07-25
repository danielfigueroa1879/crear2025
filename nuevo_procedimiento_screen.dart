import 'package:bitacora_carabineros/models/procedimiento_model.dart';
import 'package:bitacora_carabineros/services/firestore_service.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class NuevoProcedimientoScreen extends StatefulWidget {
  const NuevoProcedimientoScreen({super.key});

  @override
  State<NuevoProcedimientoScreen> createState() =>
      _NuevoProcedimientoScreenState();
}

class _NuevoProcedimientoScreenState extends State<NuevoProcedimientoScreen> {
  final _formKey = GlobalKey<FormState>();
  final _direccionController = TextEditingController();
  final _entrevistadoController = TextEditingController();
  final _resultadoController = TextEditingController();

  String? _cuadranteSeleccionado;
  final List<String> _cuadrantes = ['1', '2', '3', '4', '5', '6', '7', '8'];

  @override
  void dispose() {
    _direccionController.dispose();
    _entrevistadoController.dispose();
    _resultadoController.dispose();
    super.dispose();
  }

  void _guardarProcedimiento() {
    if (_formKey.currentState!.validate()) {
      final nuevoProcedimiento = Procedimiento(
        horaIngreso: DateTime.now(),
        cuadrante: _cuadranteSeleccionado!,
        direccion: _direccionController.text,
        personaEntrevistada: _entrevistadoController.text.isNotEmpty
            ? _entrevistadoController.text
            : null,
        resultado: _resultadoController.text,
        carabineroId: "ID_DEL_USUARIO_LOGUEADO", // Esto vendrá del sistema de auth
      );

      FirestoreService().addProcedimiento(nuevoProcedimiento).then((_) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Text('Procedimiento guardado correctamente'),
              backgroundColor: Colors.green),
        );

        _formKey.currentState!.reset();
        _direccionController.clear();
        _entrevistadoController.clear();
        _resultadoController.clear();
        setState(() {
          _cuadranteSeleccionado = null;
        });
      }).catchError((error) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text('Error al guardar: $error'),
              backgroundColor: Colors.red),
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nuevo Procedimiento'),
        centerTitle: true,
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Hora Ingreso: ${DateFormat('dd/MM/yyyy HH:mm').format(DateTime.now())}',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 20),
              DropdownButtonFormField<String>(
                value: _cuadranteSeleccionado,
                decoration: const InputDecoration(
                    labelText: 'Cuadrante', border: OutlineInputBorder()),
                items: _cuadrantes.map((String cuadrante) {
                  return DropdownMenuItem<String>(
                      value: cuadrante, child: Text('Cuadrante $cuadrante'));
                }).toList(),
                onChanged: (newValue) =>
                    setState(() => _cuadranteSeleccionado = newValue),
                validator: (value) =>
                    value == null ? 'Seleccione un cuadrante' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _direccionController,
                decoration: const InputDecoration(
                    labelText: 'Dirección',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.location_on)),
                validator: (value) =>
                    value!.isEmpty ? 'Ingrese una dirección' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _entrevistadoController,
                decoration: const InputDecoration(
                    labelText: 'Persona Entrevistada (Opcional)',
                    border: OutlineInputBorder()),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _resultadoController,
                decoration: const InputDecoration(
                    labelText: 'Resultado / Resumen del Procedimiento',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.mic)),
                maxLines: 5,
                validator: (value) =>
                    value!.isEmpty ? 'Ingrese el resultado' : null,
              ),
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: _guardarProcedimiento,
                icon: const Icon(Icons.save),
                label: const Text('GUARDAR PROCEDIMIENTO'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  textStyle: const TextStyle(
                      fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
