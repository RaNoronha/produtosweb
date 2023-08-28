import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})

export class CadastrarUsuarioComponent {

  mensagem_sucesso: string ='';
  mensagem_erro: string ='';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void{

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    if(this.formCadastro.value.senha == this.formCadastro.value.senhaConfirmacao)
    {
      this.spinner.show();    
      this.httpClient.post(environment.apiUsuarios + "/criar-conta", this.formCadastro.value)
      .subscribe({next: (data:any) => {
          this.mensagem_sucesso = `Parabéns, ${data.nome}, sua conta foi criada com sucesso`;
          this.formCadastro.reset();},
        error: (e) => {this.mensagem_erro = e.error.message;}
      }).add(() => {this.spinner.hide(); });
    }
    else{
      this.mensagem_erro = 'Senhas não conferem, por favor verifique.';
    }
  }
}