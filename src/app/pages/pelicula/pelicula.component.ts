import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieDetail } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula:MovieDetail;
  public cast: Cast[]=[];

  constructor(private route: ActivatedRoute,private location: Location,
              private router: Router,
              private peliculasservice: PeliculasService) { }

  ngOnInit() {
    const id= this.route.snapshot.params.id;
    // console.log(id);

    combineLatest([
      this.peliculasservice.getPeliculaDetalle(id),
      this.peliculasservice.getCast(id)
    ]).subscribe( ([movie,cast]) =>{
      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }

      this.pelicula= movie;
      this.cast=cast.filter( actor => {return actor.profile_path != null});
    });

    // this.peliculasservice.getPeliculaDetalle(id).subscribe(resp =>{
    //   // console.log(resp);
    //   if(!resp){
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.pelicula= resp;
    // });

    // this.peliculasservice.getCast(id).subscribe(resp => {
    //   this.cast=resp.filter( actor => {return actor.profile_path != null});
    //   // console.log(resp);
    // });
  }

  onRegresar(){
    this.location.back();
  }

}
