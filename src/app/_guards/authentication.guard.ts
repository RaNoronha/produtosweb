import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuard {
 
    constructor(private router: Router) { }

    canActivate() {

        const auth = localStorage.getItem('autentica_usu');
        if(auth != null) {

            const data = JSON.parse(auth);
            if(data.token != null) { 

                const dataHoraAtual = new Date(); 
                const dataHoraExpiracao = new Date(data.horaExpiracao as Date);
                return dataHoraAtual <= dataHoraExpiracao;
            }
            else{

                localStorage.removeItem('autentica_usu');
                this.router.navigate(['/login-usuarios']);
                return false;
            }
        }
        else {

            this.router.navigate(['/login-usuarios']);
            return false;
        }
    }
}


