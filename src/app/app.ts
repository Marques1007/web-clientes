import { Component} from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

/* para importar ctrl+. */
@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    RouterOutlet //permitir fazer a troca na navegacao dos componentes - efeito SPA
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
