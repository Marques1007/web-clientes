
import { HttpClient, HttpParams } from '@angular/common/http';
import { LOCATION_UPGRADE_CONFIGURATION } from '@angular/common/upgrade';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
      nome : new FormControl('',[Validators.required]), //campo
      cpf : new FormControl('',[Validators.required]),       //campo
      logradouro : new FormControl('',[Validators.required]),
     numero : new FormControl('',[Validators.required]),
      complemento : new FormControl('',[Validators.required]),
      bairro : new FormControl('',[Validators.required]),
      cidade : new FormControl('',[Validators.required]),
      uf : new FormControl('',[Validators.required]),
      cep : new FormControl('',[Validators.required])
    });

  //função chamada quando o formulário for submetido
  cadastrar() {
    

//para jogar no console para testar inicialmente antes de jogar para o backend
  //console.log(this.formulario.value);


       //capturando os dados do formulário
    const request = { //JSON
      nome:  this.formulario.value.nome!, //capturando o campo nome do formulário
      cpf: this.formulario.value.cpf!,  //capturando o campo cpf do formulário
      enderecos: [
        {
      logradouro: this.formulario.value.logradouro!,
      numero: this.formulario.value.numero!,
      complemento: this.formulario.value.complemento!,
      bairro: this.formulario.value.bairro!,
      cidade: this.formulario.value.cidade!,
      uf: this.formulario.value.uf!,
      cep: this.formulario.value.cep!
        }
      ]

    }

    //enviando os dados para o backend
    this.http.post('http://localhost:8081/api/cliente/criar', request, { responseType: 'text' })
//      .subscribe((resposta) => { //aguardando o retorno da API
//        console.log(resposta);      });

      .subscribe({

        next: (resposta) => { //sucesso

          alert(resposta);
          this.formulario.reset();

        },
        error: (e) => {  //capturando a resposta de erro

          alert('erro: ' + e.error);

        }
      });
  }
}
