import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private http: Router) { }

  ngOnInit() {
  }

  buscarPelicula(search: string){

    search= search.trim();
    
    if(search.length ===  0){return;}

    // console.log(search);

    this.http.navigate(['/buscar',search]);
  }

}
