import { Directive, OnInit } from '@angular/core';
import {ElementRef, Input} from '@angular/core';
import {TimelineMax} from 'gsap';

@Directive({
  selector: '[appClouds]'
})
export class CloudsDirective implements OnInit {
  @Input() top;
  @Input() left;
  public tl = new TimelineMax();

  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    this.tl.to(this.element.nativeElement, 7, {left: `+=${this.left}`, top: `+=${this.top}`, opacity: '0'}, 2);
  }
}
