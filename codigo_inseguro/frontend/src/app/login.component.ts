import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ]
})
export class LoginComponent {
username = ''; password = '';
error = '';
constructor(private api: ApiService, private auth: AuthService, private router: Router) {}
submit(){
this.api.login(this.username, this.password).subscribe({
next: (r) => { this.auth.setToken(r.token); this.router.navigateByUrl('/guests'); },
error: (e) => this.error = JSON.stringify(e) // ❌ muestra errores crudos
});
}
}
