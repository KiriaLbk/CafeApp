import { ElementRef } from '@angular/core';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHidden]'
})
export class HiddenDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseover') onMouseOver(): void{
    this.el.nativeElement.parentNode.children[0].type = 'text';
  }

  @HostListener('mouseout') onMouseOut(): void{
    this.el.nativeElement.parentNode.children[0].type = 'password';
  }

}
