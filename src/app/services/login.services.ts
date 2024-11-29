import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environmentdb } from 'src/environments/environment';

export interface UsuarioData {
  datosUsuario: {
    CodigoUsuario: number;
    Nombre: string;
    CorreoElectronico: string;
    CodigoRol: number;
    nivelAcceso: string;
    Rut: string;
  };
  permisos: Array<{
    CodigoPermiso: string;
    NombrePermiso: string;
    TipoCategoria: string;
    ValorCategoria: string;
  }>;
  region: {
    CodigoRegion: number | null;
    NombreRegion: string | null;
  };
}

export interface UsuarioResponse {
  success: boolean;
  data: UsuarioData;
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  data?: any[];
  message?: string;
}



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environmentdb.apidb}/login`;
  private isAuthenticated = false;
  private usuarioSubject = new BehaviorSubject<UsuarioData | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    // Intentar recuperar datos de usuario al iniciar el servicio
    this.checkStoredUser();
  }

  private checkStoredUser(): void {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        this.usuarioSubject.next(userData);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearUsuario();
      }
    }
  }

  login(credentials: { CorreoElectronico: string; RUT: number }): Observable<LoginResponse> {
    console.log('Intentando login con:', credentials);
    return this.http.post<LoginResponse>(`${this.apiUrl}`, credentials).pipe(
      map(response => {
        console.log('Respuesta de login:', response);
        if (response.success) {
          this.isAuthenticated = true;
        }
        return response;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  getUsuario(correo: string): Observable<UsuarioResponse> {
    console.log('Obteniendo datos de usuario para:', correo);
    console.log('URL:', `${this.apiUrl}/usuario`);

    return this.http.post<UsuarioResponse>(`${this.apiUrl}/usuario`, { correo }).pipe(
      map((response: any) => {
        console.log('Respuesta del servidor:', response);

        if (response.success) {
          const userData: UsuarioData = {
            datosUsuario: {
              CodigoUsuario: response.data.datosUsuario.CodigoUsuario,
              Nombre: response.data.datosUsuario.Nombre,
              CorreoElectronico: response.data.datosUsuario.CorreoElectronico,
              CodigoRol: response.data.datosUsuario.CodigoRol,
              nivelAcceso: response.data.datosUsuario.nivelAcceso,
              Rut: response.data.datosUsuario.Rut
            },
            permisos: response.data.permisos || [],
            region: {
              CodigoRegion: response.data.region?.CodigoRegion || null,
              NombreRegion: response.data.region?.NombreRegion || null
            }
          };

          localStorage.setItem('userData', JSON.stringify(userData));
          this.usuarioSubject.next(userData);
          console.log('Datos de usuario almacenados:', userData);

          return {
            success: true,
            data: userData
          };
        } else {
          throw new Error(response.message || 'Error al obtener el usuario');
        }
      }),
      catchError(error => {
        console.error('Error en getUsuario:', error);
        localStorage.removeItem('userData');
        this.usuarioSubject.next(null);
        return throwError(() => new Error(error.message || 'Error al obtener los datos del usuario'));
      })
    );
  }

  getUsuarioData(): UsuarioData | null {
    return this.usuarioSubject.getValue();
  }

  setAuthenticated(authenticated: boolean): void {
    this.isAuthenticated = authenticated;
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    console.log('Cerrando sesión...');
    this.isAuthenticated = false;
    this.clearUsuario();
    console.log('Sesión cerrada y datos limpiados');
  }

  clearUsuario(): void {
    localStorage.removeItem('userData');
    this.usuarioSubject.next(null);
  }

  hasUserData(): boolean {
    return this.usuarioSubject.getValue() !== null;
  }
}