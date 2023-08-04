import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NgxSpinnerService} from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.css']
})
export class CadastroProdutosComponent 
{
  mensagem: string ='';
  
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
    ){}

  formCadastro = new FormGroup(
    {
      nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
      preco: new FormControl('', [Validators.required, Validators.min(1)]),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    });

    get form(): any
    {
      return this.formCadastro.controls;
    }

    onSubmit(): void
    {
      this.spinner.show();
      this.httpClient.post(environment.apiProdutos, this.formCadastro.value)
      .subscribe(
      {
        next:(data: any) => 
          {
            this.mensagem=`Produto ${data.nome}, cadastrado com sucesso`; this.formCadastro.reset();
          }
      })
      .add(() => {this.spinner.hide()})
    }
}
