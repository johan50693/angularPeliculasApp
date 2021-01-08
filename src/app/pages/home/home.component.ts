import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[]=[];
  public moviesSlideShow: Movie[]=[];
  
  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos= (document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max= (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      if(this.PeliculasService.cargando){return;}
      // Consulta siguiente pagina
      this.PeliculasService.getCartelera().subscribe(movies =>{
        this.movies.push(...movies);
      });
    }

  }
    
  constructor(private PeliculasService: PeliculasService) { 
    this.PeliculasService.getCartelera().subscribe( movies => {
      // console.log(movies.results);
      this.movies= movies;
      this.moviesSlideShow= movies;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.PeliculasService.resetCarteleraPage();
  }
}
