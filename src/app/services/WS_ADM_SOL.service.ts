import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';  // Añadir import de tap

@Injectable({
  providedIn: 'root'
})
export class WS_ADM_SOLService {
  private apiUrl2 = '/api/web/services/WS_ADM_SOLService/WS_ADM_SOL';

  constructor(private http: HttpClient) {}

  getData(region: string, offset: string = ''): Observable<string> {
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

    const headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      'SOAPAction': ''
    });

    return this.http.post(this.apiUrl2, soapEnvelope, {
      headers,
      responseType: 'text'
    }).pipe(
      tap((response: string) => {}),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
}
