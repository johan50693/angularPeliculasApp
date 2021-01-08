import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast, CreditResponse } from 'src/app/interfaces/credits-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-cast-slide-show',
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];

  constructor() { 
    
  }
  
  ngOnInit() {
    // console.log(this.cast);
  }

  ngAfterViewInit(){
    const swiper= new Swiper('.swiper-container',{
      slidesPerView: 5.3,
      freeMode:true,
      spaceBetween: 15
    });
  }

}
