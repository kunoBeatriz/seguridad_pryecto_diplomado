import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { GuestsComponent } from './guests.component';


export const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'guests', component: GuestsComponent },
];