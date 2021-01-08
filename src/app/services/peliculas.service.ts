import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CreditResponse } from '../interfaces/credits-response';
import { MovieDetail } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string='https://api.themoviedb.org/3/';
  private carteleraPage=1;
  public cargando:boolean=false;

  get params(){
    return {
      api_key: '5308fe7ad14c9006f2421b8087dbfdec',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }
  constructor(private http: HttpClient) { }

  resetCarteleraPage(){
    this.carteleraPage=1;
  }

  getCartelera(): Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    }

    this.cargando=true;
    console.log("Cargando..."+this.carteleraPage);
    return this.http.get<CarteleraResponse>(`${this.baseURL}movie/now_playing`,{params:this.params}).pipe(
      map(resp =>{
        return resp.results;
      }),
      tap(() =>{
        this.carteleraPage +=1;
        this.cargando=false;
      })
    );
  }

  buscarPelicula(search:string):Observable<Movie[]>{
    // https://api.themoviedb.org/3/search/company?api_key=5308fe7ad14c9006f2421b8087dbfdec&query=soul&page=1
    const params = {...this.params, page:'1', query:search};

    return this.http.get<CarteleraResponse>(`${this.baseURL}search/movie`,{params:params}).pipe(
      map( resp => { 
        // console.log(resp.results);
        return resp.results;
      })
    );
  }

  getPeliculaDetalle(id: string){
    // https://api.themoviedb.org/3/movie/464052?api_key=5308fe7ad14c9006f2421b8087dbfdec&language=en-US

    return this.http.get<MovieDetail>(`${this.baseURL}movie/${id}`,{params: this.params}).pipe(
      catchError( err => {return of(null);})
    );
  }

  getCast(id: string): Observable<Cast[]>{
    // https://api.themoviedb.org/3/movie/464052/credits?api_key=5308fe7ad14c9006f2421b8087dbfdec&language=en-US

    return this.http.get<CreditResponse>(`${this.baseURL}movie/${id}/credits`,{params: this.params}).pipe(
      map( resp =>{
        return resp.cast;
      }),
      catchError( err => {return of([]);})
    );
  }

}
