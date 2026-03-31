
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-cliente.html',
  styleUrl: './cadastrar-cliente.css',
})
export class CadastrarCliente {

  //instanciando a bilbioteca HttpClient
  http = inject(HttpClient);

  //criando um formulário para capturar os campos
  formulario = new FormGroup({
      nome : new FormControl(''), //campo
      cpf : new FormControl('') //campo
  });

  //função chamada quando o formulário for submetido
  cadastrar() {
    

//para jogar no console para testar inicialmente antes de jogar para o backend
  //console.log(this.formulario.value);


    //capturando os dados do formulário
    const params = new HttpParams()
      .set('nome', this.formulario.value.nome!) //capturando o campo nome do formulário
      .set('cpf', this.formulario.value.cpf!);  //capturando o campo cpf do formulário

    //enviando os dados para o backend
    this.http.post('http://localhost:8080/api/cliente/criar', null, { params: params, responseType: 'text' })
      .subscribe((resposta) => { //aguardando o retorno da API
        console.log(resposta);
      });
  }

}