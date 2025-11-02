import { DateType } from 'react-native-ui-datepicker';


export type Tpaciente = {
    id: string;
    nombre: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: DateType | Date;
} 





export type Props = {
    cerrarModal: ()=> void
    pacientes : Tpaciente[]
    setPacientes : React.Dispatch<React.SetStateAction<Tpaciente[]>>;
    paciente : Tpaciente | null;
    setPaciente : React.Dispatch<React.SetStateAction<Tpaciente | null>>;
}