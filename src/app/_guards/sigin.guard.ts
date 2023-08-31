import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class SigninGuard {

    constructor(private router: Router) {}

    canActivate() {       
        
        const auth = localStorage.getItem('autentica_usu');
        if(auth != null) {
            this.router.navigate(['/consulta-produtos']);
            return false;
        }
        else {
            return true;
        }
    }
}


