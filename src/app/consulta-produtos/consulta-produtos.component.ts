import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-consulta-produtos',
  templateUrl: './consulta-produtos.component.html',
  styleUrls: ['./consulta-produtos.component.css']
})
export class ConsultaProdutosComponent implements OnInit 
{
  produtos: any[] = [];
  mensagem: string='';

  constructor(
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService
    ){}
  
  ngOnInit(): void 
  { 
    this.spinner.show();

    this.httpClient.get(environment.apiProdutos)
      .subscribe({next: (data) => {this.produtos = data as any[];}}).add(() => {this.spinner.hide();})    
  }

  onDelete(id:string):void
  {
    if(window.confirm('Deseja realmente excluir o produto?'))
    {
      this.spinner.show();
      this.httpClient.delete(environment.apiProdutos + "/" + id)
      .subscribe(
      {
        next: (data:any) => 
        {
          this.mensagem = `Produto ${data.nome}, excluído com sucesso`;

          this.ngOnInit();
        }
      }).add(() => 
        {
            this.spinner.hide(); 
        })
    }
  }
}




