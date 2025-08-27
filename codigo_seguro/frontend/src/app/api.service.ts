import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ApiService {
base = 'http://127.0.0.1:5000/api'; // ❌ http
constructor(private http: HttpClient) {}


login(username: string, password: string) {
return this.http.post<any>(`${this.base}/login`, { username, password });
}
register(username: string, password: string) {
return this.http.post<any>(`${this.base}/register`, { username, password });
}
guestsList() { return this.http.get<any[]>(`${this.base}/guests`); }
createGuest(d: any) { return this.http.post(`${this.base}/guests`, d); }
updateGuest(id: number, d: any) { return this.http.put(`${this.base}/guests/${id}`, d); }
deleteGuest(id: number) { return this.http.delete(`${this.base}/guests/${id}`); }
}