import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login-usuarios',
  templateUrl: './login-usuarios.component.html',
  styleUrls: ['./login-usuarios.component.css']
})
export class LoginUsuariosComponent {

  mensagem_erro: string ='';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  formLogin = new FormGroup({    
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),    
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit(): void {

    this.mensagem_erro = '';

    this.spinner.show();

    this.httpClient.post(environment.apiUsuarios+ '/autenticar', this.formLogin.value)
    .subscribe({next: (data: any) => {
          localStorage.setItem('autentica_usu', JSON.stringify(data));
          window.location.href = '/consulta-produtos';
        },
      error: (e) => {this.mensagem_erro = e.error.message;},
      }).add(() => {this.spinner.hide();});
  }

}
