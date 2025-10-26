import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import Formulario from "../components/Formulario";
import {SafeAreaView} from 'react-native-safe-area-context';
import { Tpaciente } from "../types/paciente";


export const Home = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [pacientes, setPacientes] = React.useState<Tpaciente[]>([]);
  const [paciente, setPaciente] = React.useState<Tpaciente | null>(null);


  const cerrarModal = () => {
    setModalVisible(false);
  };

  const pacienteEditar = (pc: Tpaciente) =>{
    const pacienteActual = [pc, ...pacientes];
    setPacientes(pacienteActual);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>

        {pacientes.length === 0 ? (
          <Text>No hay pacientes aún 🥺</Text>
        ): (
          <Text>Componente pendiente 😔</Text>
        )}

        <Pressable
          style={styles.btnNuevaCita}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
        </Pressable>

        {modalVisible &&
         <SafeAreaView>
         <Formulario 
            cerrarModal={cerrarModal}
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          ></Formulario>
         </SafeAreaView>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "900",
    color: "#6D28D9",
  },
  btnNuevaCita: {
    backgroundColor: "#6D28D9",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
