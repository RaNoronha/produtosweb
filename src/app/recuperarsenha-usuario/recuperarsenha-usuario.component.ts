import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recuperarsenha-usuario',
  templateUrl: './recuperarsenha-usuario.component.html',
  styleUrls: ['./recuperarsenha-usuario.component.css']
})
export class RecuperarsenhaUsuarioComponent {

  mensagem_sucesso: string ='';
  mensagem_erro: string ='';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  formRecuperarSenha  = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  onSubmit(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.spinner.show();

    this.httpClient.post(environment.apiUsuarios + '/recuperar-senha',this.formRecuperarSenha.value)
      .subscribe({next: (data: any) => {
          this.mensagem_sucesso = `Parabéns ${data.nome}, sua recuperação de senha foi realizada com sucesso. Verifique seu email.`;
          this.formRecuperarSenha.reset();
        }, error: (e) => {this.mensagem_erro = e.error.message;},       
      }).add(() => {this.spinner.hide();});
  }
}


