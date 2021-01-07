import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[]=[];
  public moviesSlideShow: Movie[]=[];
  
  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos= (document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max= (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      // Consulta siguiente pagina
      this.PeliculasService.getCartelera().subscribe(resp =>{
        this.movies.push(...resp.results);
      });
    }

  }
    
  constructor(private PeliculasService: PeliculasService) { 
    this.PeliculasService.getCartelera().subscribe( resp => {
      // console.log(resp.results);
      this.movies= resp.results;
      this.moviesSlideShow= resp.results;
    });
  }

  ngOnInit() {
  }

}
