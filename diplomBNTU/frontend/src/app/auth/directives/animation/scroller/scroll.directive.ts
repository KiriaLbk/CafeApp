import { Directive, OnInit } from '@angular/core';
import {ElementRef, Input} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit {
  @Input() delay;
  @Input() left;

  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    gsap.to(this.element.nativeElement, 3, {
      scrollTrigger: this.element.nativeElement,
      left:  `+=${this.left}`,
      delay: this.delay,
      opacity: 1
    });
  }

}
