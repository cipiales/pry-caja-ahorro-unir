export interface TransaccionCrear {
  acciones: number;
  asistencia: boolean;
  nroCuenta: string;
  tieneCredito: boolean;
  solicitudCredito: boolean;
  nombreSocio: string;
  ahorro: number;
  fondoReserva: number;
  pagoAcciones: number;
  pagoCredito: number;
  pagoInteres: number;
}
