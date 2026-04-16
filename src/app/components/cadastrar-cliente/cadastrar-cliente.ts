
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LOCATION_UPGRADE_CONFIGURATION } from '@angular/common/upgrade';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule // para utilozar o signals
  ],
  templateUrl: './cadastrar-cliente.html',
  styleUrl: './cadastrar-cliente.css',
})
export class CadastrarCliente {

  //declarar 2 atributos
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //instanciando a bilbioteca HttpClient
  //para fazer chamadas das APIs
  http = inject(HttpClient);

  //criando um formulário para capturar os campos
  formulario = new FormGroup({
      nome : new FormControl('',[Validators.required,Validators.minLength(6)]), //campo
      cpf : new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),       //campo
      logradouro : new FormControl('',[Validators.required]),
     numero : new FormControl('',[Validators.required]),
      complemento : new FormControl('',[Validators.required]),
      bairro : new FormControl('',[Validators.required]),
      cidade : new FormControl('',[Validators.required]),
      uf : new FormControl('',[Validators.required]),
      cep : new FormControl('',[Validators.required])
    });


buscarCep() {
  //capturar o valor preenchido no campo do CEP do formulario
  const cep = this.formulario.get('cep')?.value;
  // verificar se o campo tem no minimo 8 caractares preenchidos
  if(cep?.length != 8) return; //finalizo a funcao

  //consultando o cep na API viacep
  this.http.get("https://viacep.com.br/ws/" + cep + "/json")
  .subscribe((data: any) => {
    //verifica se retornou erro
    if (data.erro) return; //finaliza a funcao

    //preencher o formulario com os dados obtidos do endereco
    this.formulario.patchValue({
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      uf: data.uf
    });

  });
  
}

  //função chamada quando o formulário for submetido
  cadastrar() {
    

    //limpar as mensagens
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

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

          // retirando o alert e utilizar a biblioteca signals
          // alert(resposta);
          this.mensagemSucesso.set(resposta); //exibindo a mensagem de sucesso

          this.formulario.reset();

        },
        error: (e) => {  //capturando a resposta de erro

          // retirando o alert e utilizar a biblioteca signals
          // alert('erro: ' + e.error);
          this.mensagemErro.set(e.error); //exibindo a mensagem de sucesso

        }
      });
  }
}
