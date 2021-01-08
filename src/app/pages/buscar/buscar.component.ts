import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  private pelicula: string;
  public movies: Movie[]=[];

  constructor(private route: ActivatedRoute, private PeliculasService: PeliculasService) { 
    this.route.params.subscribe(params => {
      // console.log(params);
      this.pelicula=params.texto;
      this.PeliculasService.buscarPelicula(params.texto).subscribe(resp =>{
        // console.log(resp);
        this.movies=resp;
      });
    });

  }

  ngOnInit() {
  }

}
