import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-produtos',
  templateUrl: './edicao-produtos.component.html',
  styleUrls: ['./edicao-produtos.component.css']
})
export class EdicaoProdutosComponent implements OnInit
{
  mensagem: string ='';
  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
    ){}

  formEdicao = new FormGroup(
    {
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
      preco: new FormControl('', [Validators.required, Validators.min(1)]),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    });

    get form(): any
    {
      return this.formEdicao.controls;
    }

    ngOnInit(): void
    {
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

      this.spinner.show();

      this.httpClient.get(environment.apiProdutos + "/" + id)
      .subscribe({next: (data:any) => 
        {
          this.formEdicao.patchValue(data);
        }}).add(() => 
        {
          this.spinner.hide();
        })   
    }

    onSubmit(): void
    {
      this.spinner.show();
      this.httpClient.put(environment.apiProdutos, this.formEdicao.value)
      .subscribe(
      {
        next:(data: any) => 
          {
            this.mensagem=`Produto ${data.nome}, atualizado com sucesso`;
          },
      })
      .add(() => {this.spinner.hide()})
    }
}
