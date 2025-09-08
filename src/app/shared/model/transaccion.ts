export class Transaccion {

  id: {
            secuencialTransaccionCajaAhorro: string,
            id: {
                codigoCiclo: string,
                codigoCajaAhorro: string
            }
    }

fechaTransaccionCajaAhorro: string;
transaccionAhorroTotal: string;
transaccionFondoReservaTotal: string;
transaccionCreditoTotal: string;
pagoInteresTotal: string;
pagoAccionesTotal:string;
estado: string;
numeroTransaccionCajaAhorro:string;
saldoTotalCajaAhorro: string;
saldoTotalTransaccionCajaAhorro: string;
fechaRegistro: string;
usuarioModificacion: string;
fechaModificacion: string;
  cicloDTO: {
    id: {
                codigoCiclo: string,
                codigoCajaAhorro: string
            },
            secuencialAccion: string;
            esCicloActual: true;
            estado: string;
            fechaFin: string;
            fechaInicio: string;
            tasaInteresCreditos: string;
            cantidadAhorroFondoReserva: string;
            usuarioRegistro:string;
            fechaRegistro: string;
            usuarioModificacion: string;
            fechaModificacion: string


  }

}
