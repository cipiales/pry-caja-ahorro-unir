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
                  "codigoCuenta":null

              }
            }
          }
        }

}
