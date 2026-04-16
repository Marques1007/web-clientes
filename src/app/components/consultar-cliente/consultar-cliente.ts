import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './consultar-cliente.html',
  styleUrl: './consultar-cliente.css',
})
export class ConsultarCliente {

  //atributos
  clientes = signal<any[]>([]); //lista de objetos array
  
  //instanciando a variavel HTTPCLIENT
  http = inject (HttpClient);

  //variaceis para exibir as mensagens de sucesso eou de erro
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');
  
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
        // retirei para inserir o array de cleintes
        // console.log(data);
        this.clientes.set(data as any[]);

      });


    }


    excluir (id : number) 
    {
      if (confirm('Deseja excluir o cliente selecionado?')) 
      {

        //limpar as mensagens
        this.mensagemSucesso.set('');
        this.mensagemErro.set('');

        //excluir o cliente com o ID  
        this.http.delete('http://localhost:8081/api/cliente/excluir/' + id, {responseType: 'text'})
        .subscribe({

          next: (resposta) => 
          { //capturar uma resposta de sucesso
              this.mensagemSucesso.set(resposta);
              this.consultar();
          },
          error: (e) => 
          {
              this.mensagemErro.set(e.error);
          }
          

      }); 
      }
    
    }
}
