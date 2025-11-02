import React from 'react'
import { Modal,Pressable,ScrollView, Text, TextInput, View, StyleSheet } from 'react-native'
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tpaciente, Props } from '../types/paciente';


export default function Formulario({cerrarModal, pacientes, setPacientes, paciente, setPaciente}: Props) {
    const [Npaciente, setNPaciente] = React.useState('');
    const [propietario, setPropietario] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [selected, setSelected] = React.useState<DateType>();
    const defaultStyles = useDefaultStyles();
    let today = new Date();

    React.useEffect(()=>{
        if(paciente){
            setNPaciente(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setTelefono(paciente.telefono)
            setSelected(paciente.fecha as Date)
        }
    },[paciente])

    const handleCita = () =>{
        if (paciente){
            const pacientesActualizados = pacientes.map(p => p.id == paciente.id
                ? {
                    ...p,
                    nombre: Npaciente.trim(),
                    propietario: propietario.trim(),
                    email: email.trim(),
                    telefono: telefono.trim(),
                    fecha: selected ?? today,
                } : p
            );
            setPacientes(pacientesActualizados)
        } else{
            const nuevoPaciente: Tpaciente = {
                id: Date.now().toString(),
                nombre: Npaciente.trim(),
                propietario: propietario.trim(),
                email: email.trim(),
                telefono: telefono.trim(),
                fecha: selected ?? today,
            };

            setPacientes([nuevoPaciente, ...pacientes]);
        }

        setNPaciente('');
        setPropietario('');
        setEmail('');
        setTelefono('');
        setSelected(undefined);
        setPaciente(null);

        cerrarModal();
    }


  return (
    <Modal animationType='slide' visible={true}>
        <SafeAreaView style={styles.contenido}>
        <ScrollView style = {styles.contenido}>
            <Text style = {styles.titulo}>Nueva cita</Text>
            <Pressable style = {styles.btnCancelar} onPress={()=>cerrarModal()}>
                <Text style = {styles.btnCancelarTexto}>Cancelar X</Text>
            </Pressable>

            <View>
                <Text style = {styles.label}>Nombre paciente</Text>
                <TextInput style = {styles.input}
                placeholder='Nombre del paciente'
                placeholderTextColor={'#666'}
                value={Npaciente}
                onChangeText={setNPaciente}
                ></TextInput>
            </View>
            <View>
                <Text style = {styles.label}>Nombre propietario</Text>
                <TextInput style = {styles.input}
                placeholder='Nombre del propietario'
                placeholderTextColor={'#666'}
                value={propietario}
                onChangeText={setPropietario}
                ></TextInput>
            </View>
            <View>
                <Text style = {styles.label}>Email</Text>
                <TextInput style = {styles.input}
                placeholder='Email del propietario'
                placeholderTextColor={'#666'}
                value={email}
                onChangeText={setEmail}
                ></TextInput>
            </View>
            <View>
                <Text style = {styles.label}>Telefono</Text>
                <TextInput style = {styles.input}
                placeholder='Telefono del propietario'
                placeholderTextColor={'#666'}
                value={telefono}
                onChangeText={setTelefono}
                ></TextInput>
            </View>
            <View>
                <Text style = {styles.label}>Fecha cita</Text>
                <View style = {styles.fechaContenedor}>
                    <DateTimePicker
                        mode = 'single'
                        date= {selected}
                        onChange={({date})=>setSelected(date)}
                        minDate={today}
                        styles={
                            {
                                today: { borderColor: 'purple', borderWidth: 1 }, 
                                selected: { backgroundColor: 'purple' }, 
                                selected_label: { color: 'white' }
                            }
                        }
                        locale="es"
                        firstDayOfWeek={1}
                        initialView="day"
                    ></DateTimePicker>
                </View>
            </View>

            <Pressable style = {styles.btnNuevaCita} onPress={()=>handleCita()}>
                <Text style = {styles.btnNuevaCitaTexto}>{paciente ? 'Editar Paciente' : 'Guardar Cita'}</Text>
            </Pressable>
            
        </ScrollView>
        </SafeAreaView>
    </Modal>    
  )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#b955e8ff',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#8206eeff',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#FFF',  
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    sintomasInput: {
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    }
})
