import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  private mySwiper: Swiper;

  constructor() { 
  }
  
  ngOnInit() {
    // console.log(this.movies);
  }

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    })
  }

  onSlidePrev(){
    this.mySwiper.slidePrev();
  }
  
  onSlideNext(){
    this.mySwiper.slideNext();
  }

}
