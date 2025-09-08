export const ParametrosConfig = {



        cuerpoAutorizacion: {
          metodoAutorizacion: {
            'cuerpo_http': {

              "targetMethod":"GET",
              "queryParams":{
                  "userNom":null,
                  "userPwd":null

              }
            }
          }
        },
         cuerpoCuentas: {
          metodoCuentas: {
            'cuerpo_http': {

              "targetMethod":"GET",
              "queryParams":{
                  "estado":null,
                  "cedulaIdentidad":null,
                  "codigoCuenta":null,
                  "codigoCajaAhorro":null

              }
            }
          }
        },
         cuerpoSocio: {
          metodoSocio: {
            'cuerpo_http': {
              "targetMethod":"POST",
              "body":{
                  "cedulaIdentidad":null,
                  "direccion":null,
                  "estado":null,
                  "primerApellido":null,
                  "segundoApellido":null,
                  "primerNombre":null,
                  "segundoNombre":null,
                  "sexo":null,
                  "nombreCompleto":null,
                  "telefonoConvencional":null,
                  "telefonoCelular":null,
                  "codigoSocio":null,
                  "usuarioRegistro":null,
                  "fechaRegistro":null
              }
            }
          }
        }
        ,
         cuerpoCrearCuenta: {
          metodoCrearCuenta: {
            'cuerpo_http': {
              "targetMethod":"POST",
              "body":{
                  "codigoCajaAhorro":null,
                  "estado":null,
                  "usuarioRegistro":null,
                  "fechaRegistro":null,
                  "socio":{
                    "cedulaIdentidad":null
                  }

              }
            }
          }
        }
        ,

         cuerpoTransacciones: {
          metodoTransacciones: {
            'cuerpo_http': {

              "targetMethod":"GET",
              "queryParams":{
                  "fechaTransaccionCajaAhorro":null,
                  "numeroTransaccionCajaAhorro":null,
                  "codigoCiclo":null

              }
            }
          }
        },
        cuerpoDetalleTransacciones: {
          metodoDetalleTransacciones: {
            'cuerpo_http': {

              "targetMethod":"GET",
              "queryParams":{
                  "secuencialTransaccionCajaAhorro":null,
                  "codigoCajaAhorro":null
              }
            }
          }
        }



}
