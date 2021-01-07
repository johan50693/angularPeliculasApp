import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string='https://api.themoviedb.org/3/';
  private carteleraPage=1;

  get params(){
    return {
      api_key: '5308fe7ad14c9006f2421b8087dbfdec',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  constructor(private http: HttpClient) { }

  getCartelera(): Observable<CarteleraResponse>{
    return this.http.get<CarteleraResponse>(`${this.baseURL}movie/now_playing`,{params:this.params}).pipe(
      tap(() =>{
        this.carteleraPage +=1;
      })
    );
  }
}
