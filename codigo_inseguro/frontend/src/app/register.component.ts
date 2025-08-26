import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ]

})
export class RegisterComponent {
username = ''; password = '';
error = '';
constructor(private api: ApiService, private router: Router) {}
submit(){
this.api.register(this.username, this.password).subscribe({
next: () => this.router.navigateByUrl('/'),
error: (e) => this.error = JSON.stringify(e) // ❌ muestra errores crudos
});
}
}
