import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment';

interface LoginResponse {
 success: boolean;
 data?: any[];
 message?: string;
}

interface UsuarioResponse {
 success: boolean;
 data: any;
}

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private apiUrl = `${environmentdb.apidb}/login`; // Changed from /auth to /login

 constructor(private http: HttpClient) {}

 login(credentials: {CorreoElectronico: string, RUT: number}): Observable<LoginResponse> {
   return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials);
 }

 getUsuario(correo: string): Observable<UsuarioResponse> {
   return this.http.post<UsuarioResponse>(`${this.apiUrl}/usuario`, { correo });
 }
}