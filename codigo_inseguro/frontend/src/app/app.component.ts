import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  //templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
//    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'secure-app';
}
