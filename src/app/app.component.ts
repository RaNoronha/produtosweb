import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
 
 
  isAuthenticated: boolean = false;

  nomeUsuario: string = '';
  emailUsuario: string = '';

  
  ngOnInit(): void {
    
    const data = localStorage.getItem('autentica_usu');
    
    if (data != null) {
      this.isAuthenticated = true;     
      this.nomeUsuario = JSON.parse(data).nome;
      this.emailUsuario = JSON.parse(data).email;
    }
  }  
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      
      localStorage.removeItem('autentica_usu');
      
      window.location.href = '/login-usuarios';
    }
  }
}




