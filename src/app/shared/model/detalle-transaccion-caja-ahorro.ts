export class DetalleTransaccionCajaAhorro {
  id!: {
    secuencialDetalleTransacionCajaAhorro: string;
    cedulaIdentitidad: string;
    codigoCuenta: string;
    codigoCajaAhorro: string;
  };

  secuencialTransaccionCajaAhorro!: string;
  cantidadAhorro?: number | null;
  cantidadFondoReserva?: number | null;
  pagoCredito?: number | null;
  pagoInteres?: number | null;
  pagoAcciones?: number | null;
  asistencia?: boolean | null;
  codigoCiclo!: string;
  solicitudCredito?: any;
  tieneCredito?: any;
   editable?: boolean | null;
  pagoCutotacredito?: number | null;
  pagoAccion?: number | null;
  usuarioRegistro!: string;
  fechaRegistro!: number;
  usuarioModificacion?: string | null;
  fechaModificacion?: number | null;
}
