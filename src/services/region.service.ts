import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentdb } from 'src/environments/environment'; // Importa el archivo de ambiente

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = `${environmentdb.apidb}/tbRegion`; // Construye la URL completa usando environment

  constructor(private http: HttpClient) {}

  // Método para obtener las regiones
  getRegions(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para actualizar la región seleccionada
  setRegion(regionId: number) {
    console.log('Región seleccionada:', regionId);
    // Aquí podrías manejar el estado compartido si es necesario.
  }
}
