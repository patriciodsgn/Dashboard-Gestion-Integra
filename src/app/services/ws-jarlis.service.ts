import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WsJarlisService {
  // Cambia la URL al proxy configurado en Angular en vez de usar la URL directa
  private apiUrl = '/api/web/services/WS_JARLISService/WS_JARLIS';

  constructor(private http: HttpClient) {}

  getData(pcomuna: string, pdireem: string, pjardin: string, pmasreg: string): Observable<string> {
    // SOAP Envelope con estructura basada en el WSDL proporcionado
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws_jarlis.wsbeans.iseries/">
        <soapenv:Header/>
        <soapenv:Body>
          <ws:ws_jarlis>
            <arg0>
              <PCOMUNA>${pcomuna}</PCOMUNA>
              <PDIREEM>${pdireem}</PDIREEM>
              <PJARDIN>${pjardin}</PJARDIN>
              <PMASREG>${pmasreg}</PMASREG>
            </arg0>
          </ws:ws_jarlis>
        </soapenv:Body>
      </soapenv:Envelope>`;

    // Headers de la solicitud SOAP
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',       // Tipo de contenido para SOAP
      'SOAPAction': ''                  // SOAPAction puede ser vacío si no se especifica
    });

    return this.http.post(this.apiUrl, soapEnvelope, { headers, responseType: 'text' }).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }
}
