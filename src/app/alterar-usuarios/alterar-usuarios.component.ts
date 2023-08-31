import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-alterar-usuarios',
  templateUrl: './alterar-usuarios.component.html',
  styleUrls: ['./alterar-usuarios.component.css']
})
export class AlterarUsuariosComponent implements OnInit {

  mensagem_sucesso: string ='';
  mensagem_erro: string ='';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    const auth = localStorage.getItem('autentica_usu');
    const data = JSON.parse(auth as string);
    this.formAlterar.controls.nome.setValue(data.nome);
  
  }

  formAlterar = new FormGroup({
    nome: new FormControl('', [Validators.minLength(8)]),    
    senha: new FormControl('', [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    senhaConfirmacao: new FormControl('', [])
  });

  get form(): any {
    return this.formAlterar.controls;
  }

  onSubmit(): void{

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    if(this.formAlterar.value.senha == this.formAlterar.value.senhaConfirmacao)
    {
      this.spinner.show();    
      
      const auth = localStorage.getItem('autentica_usu');
      const data = JSON.parse(auth as string);

      const httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + data.token,
      });

      this.httpClient.put(environment.apiUsuarios + "/atualizar-dados", this.formAlterar.value, {headers: httpHeaders})
      .subscribe({next: (data:any) => {
          this.mensagem_sucesso = `Parabéns, ${data.nome}, dados atualizados com sucesso`;
          this.formAlterar.controls.senha.setValue('');
          this.formAlterar.controls.senhaConfirmacao.setValue('');},
        error: (e) => {this.mensagem_erro = e.error.message;}
      }).add(() => {this.spinner.hide(); });
    }
    else {
      this.mensagem_erro = 'Senhas não conferem, por favor verifique.';
    }

  }
}
