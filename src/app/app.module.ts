import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxSpinnerModule } from "ngx-spinner"
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastroProdutosComponent } from './cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './edicao-produtos/edicao-produtos.component';

import { LoginUsuariosComponent } from './login-usuarios/login-usuarios.component';
import { AlterarUsuariosComponent } from './alterar-usuarios/alterar-usuarios.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';
import { RecuperarsenhaUsuarioComponent } from './recuperarsenha-usuario/recuperarsenha-usuario.component';

const routes: Routes =[
  { path : '', pathMatch : 'full', redirectTo : 'login-usuarios' },

  { path : 'login-usuarios', component: LoginUsuariosComponent },
  { path : 'cadastrar-usuarios', component: CadastrarUsuarioComponent },
  { path : 'alterar-usuarios', component: AlterarUsuariosComponent },
  { path : 'recuperarsenha-usuarios', component: RecuperarsenhaUsuarioComponent },
  { path:'cadastro-produtos', component: CadastroProdutosComponent },
  { path:'consulta-produtos', component: ConsultaProdutosComponent },
  { path:'edicao-produtos/:id', component: EdicaoProdutosComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CadastroProdutosComponent,
    ConsultaProdutosComponent,
    EdicaoProdutosComponent,
    LoginUsuariosComponent,
    AlterarUsuariosComponent,
    CadastrarUsuarioComponent,
    RecuperarsenhaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
