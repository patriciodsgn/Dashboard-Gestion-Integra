import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-login',
  standalone: true,
  imports: [],
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css'] // Corrección aquí
})
export class ViewLoginComponent {
  constructor(private router: Router) {}

  // Navegación a una ruta interna
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Redirección a una URL externa
  navigateToCU() {
    window.location.href = 'https://accounts.claveunica.gob.cl/accounts/login/?next=/openid/authorize/%3Fclient_id%3D9a76efc4c34e4bd7843206658dc45454%26response_type%3Dcode%26scope%3Dopenid%2Brun%2Bname%26redirect_uri%3Dhttps%253A%252F%252Fclaveunica.gob.cl%252Fauth%252Fcallbacklogin%26state%3DbKrRKJiSmMcpG2yTvIOjy1JToks';
  }
}
