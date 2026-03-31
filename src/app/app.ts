import { Component} from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { CadastrarCliente } from './components/cadastrar-cliente/cadastrar-cliente';

/* para importar ctrl+. */
@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    CadastrarCliente
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
