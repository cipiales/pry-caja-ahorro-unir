export class RegistrarEventoEntrada {

    'bodyIn': RegistrarEventoEntradaBodyIn;

    constructor() {

        this.bodyIn = {
            codigoTransaccion: null,
            tipoProceso: null,
            accion: null,
            codigoRespuesta: null,
            respuesta: null

        };
    }

}

export interface RegistrarEventoEntradaBodyIn {
    codigoTransaccion?: string;
    tipoProceso?: string;
    accion?: string;
    codigoRespuesta?: string;
    respuesta?: string;

}

