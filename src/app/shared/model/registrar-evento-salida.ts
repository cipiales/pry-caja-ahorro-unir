
import { Error } from './error';

export class RegistrarEventoSalida {
    bodyOut?: BodyOut;
    error?: Error;
}

export interface BodyOut {
    logTransaccion?: LogTransaccion;
}


export interface LogTransaccion {
    logRegistrado?: string;
}
