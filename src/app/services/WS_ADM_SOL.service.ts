import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WS_ADM_SOLService {
  private api = '/api/adm-sol';  // Actualiza el endpoint a la ruta de proxy configurada

  constructor(private http: HttpClient) {}

  getData(region: string, offset: string = ''): Observable<string> {
    // Definimos el cuerpo de la solicitud SOAP
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws_adm_sol.wsbeans.iseries/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:ws_adm_sol>
            <arg0>
              <SOLACC>W_JAR_TOD2</SOLACC>
              <SOLINP>${region}||\\</SOLINP>
              <SOLMAS>${offset}</SOLMAS>
            </arg0>
          </ws:ws_adm_sol>
        </soapenv:Body>
      </soapenv:Envelope>`;

    // Configuramos las cabeceras de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': ''
    });

    // Realizamos la solicitud POST y aplicamos los operadores
    return this.http.post(this.api, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      tap((response: string) => {
        // Aquí puedes añadir cualquier lógica adicional de procesamiento
        //console.log('Respuesta recibida:', response);
      }),
      catchError((error) => {
        console.error('Error al obtener los datos del servicio WSDL:', error);
        return throwError(() => new Error('Error en la llamada SOAP: ' + error.message));
      })
    );
  }
}
