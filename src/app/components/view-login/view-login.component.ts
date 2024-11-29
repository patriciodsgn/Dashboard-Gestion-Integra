import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/login.services';

@Component({
  selector: 'app-view-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css'],
})
export class ViewLoginComponent {
  emailInput: string = '';
  passwordInput: string = '';
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Manejar el envío del formulario de login.
   */
  onSubmit() {
    this.showError = false;

    const credentials = {
      CorreoElectronico: this.emailInput,
      RUT: Number(this.passwordInput),
    };

    // Autenticar al usuario
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          // Llamar a los datos del usuario tras autenticación exitosa
          this.loadUserDetails(this.emailInput);
        }
      },
      error: (error) => {
        this.errorMessage =
          error.error.message || 'Error en el inicio de sesión';
        this.showError = true;
      },
    });
  }

  /**
   * Llamar al servicio para obtener los detalles del usuario
   * y almacenarlos en memoria/localStorage.
   * @param correo El correo electrónico del usuario autenticado.
   */
  private loadUserDetails(correo: string) {
    this.authService.getUsuario(correo).subscribe({
      next: (userResponse) => {
        if (userResponse.success) {
          // Log para depuración
          console.log('Datos del usuario cargados:', userResponse.data);

          // El AuthService se encargará de guardar los datos del usuario
          this.navigateToHome(); // Redirigir al home
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
        this.errorMessage =
          'Error al cargar los datos del usuario. Intente nuevamente.';
        this.showError = true;
      },
    });
  }

  /**
   * Redirigir al componente Home.
   */
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  /**
   * Redirigir al flujo de Clave Única.
   */
  navigateToCU() {
    window.location.href =
      'https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/%3Fclient_id%3D9a76efc4c34e4bd7843206658dc45454%26response_type%3Dcode%26scope%3Dopenid%2Brun%2Bname%26redirect_uri%3Dhttps%253A%252F%252Fclaveunica.gob.cl%252Fauth%252Fcallbacklogin%26state%3DbKrRKJiSmMcpG2yTvIOjy1JToks';
  }
}
