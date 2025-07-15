import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//import { User } from "app/models/user";
import { AuthService } from "../../app/services/auth.service";
import { MessageService } from '../shared/services/message-services/message.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
      AuthService
    ]
})

export class LoginComponent implements OnInit {

   usuario :string;
   clave:string;
   public browserSupport : boolean = true;


   //@Input() usuario: string;
   @Input() homeclaveUrl: string;
   //@Input() clave: string;
   message: string = '';


    constructor( private route: ActivatedRoute,private router: Router,private authService:AuthService,private messageService: MessageService,private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }



   /*signIn(form) {
      console.log("usuario: "+this.usuario+"this.clave:" +this.clave);

      this.redirectToHome();
    }*/
    private redirectToHome() {
      this.router.navigate(['/compracartera/dashboard']);
    }



onSubmit() {
        this.authenticationService.login(this.usuario,this.clave)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from route parameters or default to '/'
                    //const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    //console.log("returnUrl:"+returnUrl);
                    //this.router.navigate([returnUrl]);
                    this.redirectToHome();
                },
                error: error => {
                  console.log("Error al Loguearse"+ error)
                    //this.error = error;
                    //this.loading = false;
                }
            });
    }


    onSubmit1(form) {

      /*
      console.log("Ingresa a signIn ");
      if (form.valid) {
        let usrLogged = this.authService.signIn(this.usuario, this.clave)
          .then(res => {
            if (res) {
              console.log(res);
              this.redirectToHome()
            }
            else {
              form.valid = false;
            }
          })
          .catch(this.handleError.bind(this))
      }*/

          this.authService.signIn(this.usuario,this.clave).subscribe(
            respuesta => {
              //this.appComponent.cerrarProgreso();
              if(respuesta) {
                //const validar = bcrypt.compareSync(`${this.userDetails.usuario}:${fecha}`, respuesta.tokenId);

                this.redirectToHome();
              console.log("Encontro el servicio");

              } else {
                console.log("no Encontro el servicio");
               this.messageService.add("Error al obtener la información");
               this.redirectToHome();
              }
            },
            err => {
              //this.appComponent.cerrarProgreso();
              //this.messageService.add(ERROR_MESSAGE_APP.MENSAJE_ERROR_SISTEMA);
              this.redirectToHome();
            });
    }

   /* private redirectToHome() {
      console.log("Ingresa a redirectToHome ");
      this.router.navigate(['/home']);
    }*/

    private handleError(msg) {
      this.message = msg.error.message;
    }
    /*onSubmit(_datos) {
      console.log(_datos.value);
    }*/

      /**
   * Login form validation.
   * @param {object} nomCampo- Form object.
   */
  validacionDeCampo(nomCampo){
    return nomCampo.invalid && nomCampo.errors && (nomCampo.dirty || nomCampo.touched);
  }
  /**
   * Login form mandatory field validation.
   * @param {object} nomCampo- Form object.
   */
  campoObligatorio(nomCampo){
    return nomCampo.errors != null && nomCampo.hasError('required')  && nomCampo.touched;
  }
  /**
   * login form minimum length validation.
   * @param {object} nomCampo-Form object
   */
  losCamposNoSonCorrectos(nomCampo){
    return nomCampo.errors != null && nomCampo.hasError('minlength');
  }
  validarReseteo() {}

}
