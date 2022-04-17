import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterResourceService {

  constructor(
    private http: HttpClient,
  ) { }

  public getInfo(url: string,): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${url}`);
  }
  
  public getInfoWithParam(url: string, params: any) {
    return this.http.get(`${environment.apiUrl}/${url}`, params);
  }
}
