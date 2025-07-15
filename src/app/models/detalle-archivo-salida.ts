export interface DetalleArchivoSalida {

  bodyOut: BodyOut;
  error: Error;
}

export interface BodyOut {
  idCompraCartera: string;
  numeroRegistros: string;
  respuestasEjecucion: RespuestasEjecucion[];
}

export interface RespuestasEjecucion {
  linea: string;
  detalleEjecucion: string;
}