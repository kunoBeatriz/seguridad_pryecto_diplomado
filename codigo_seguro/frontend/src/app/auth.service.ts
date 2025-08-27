import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthService {
setToken(t: string) { localStorage.setItem('token', t); } // ❌
getToken() { return localStorage.getItem('token'); }
isLogged() { return !!this.getToken(); }
}