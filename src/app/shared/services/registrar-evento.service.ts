import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_URL_CONFIG } from '../config/service-url-config';
import { map } from 'rxjs/operators';
import { RegistrarEventoEntrada } from '../model/registrar-evento-entrada';
import { RegistrarEventoSalida } from '../model/registrar-evento-salida';

@Injectable({
  providedIn: 'root'
})
export class RegistrarEventoService {

  registrarEventoEntrada: RegistrarEventoEntrada;

  constructor(private http: HttpClient) { }

  registroEvento(codigoTransaccion: string, tipoProceso: string) {

    this.registrarEventoEntrada = new RegistrarEventoEntrada();
    this.registrarEventoEntrada.bodyIn.codigoTransaccion = codigoTransaccion;
    this.registrarEventoEntrada.bodyIn.tipoProceso = tipoProceso;
    this.registrarEventoEntrada.bodyIn.accion = 'Consultar';
    this.registrarEventoEntrada.bodyIn.codigoRespuesta = '0';
    this.registrarEventoEntrada.bodyIn.respuesta = 'Registro Evento';

    return this.http.post<RegistrarEventoSalida>(SERVICE_URL_CONFIG.BASE_URL +
      SERVICE_URL_CONFIG.REGISTRAR_LOG_TRANSACCIONES, this.registrarEventoEntrada)
      .pipe(
        map(respuesta => {
          return respuesta;
        })
      );

  }


}
