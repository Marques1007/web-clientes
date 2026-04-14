import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-cliente.html',
  styleUrl: './consultar-cliente.css',
})
export class ConsultarCliente {

  
  //instanciando a variavel HTTPCLIENT
  http = inject (HttpClient);

  
  //criando o formulario 
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

    consultar() {

      //capturar o valor preenchido no campo do formulario
      const nome = this.formulario.value.nome!;

    //enviando os dados para o backend para consultar os clientes da api
    this.http.get('http://localhost:8081/api/cliente/consultar?nome=' + nome)
//      .subscribe((resposta) => { //aguardando o retorno da API
//        console.log(resposta);      });

      .subscribe((data) => {

        console.log(data);
      });


    }
}
