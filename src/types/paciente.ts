import { DateType } from 'react-native-ui-datepicker';


export type Tpaciente = {
    id: number;
    nombre: string;
    propietario: string;
    email: string;
    telefono: string;
    fecha: DateType | Date;
} 