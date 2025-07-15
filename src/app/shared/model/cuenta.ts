export interface Cuenta {
  codigoCuenta: string;
  codigoCajaAhorro: string;
  estado: string;
  socio: {
           cedulaIdentidad: string;
            direccion: string;
            estado: string;
            primerApellido: string;
            primerNombre: string;
            segundoApellido:string;
            segundoNombre: string;
            sexo: string;
            nombreCompleto: string;
            telefonoCelular: string;
            telefonoConvencional: string;
            codigoSocio: string;

  }

}
