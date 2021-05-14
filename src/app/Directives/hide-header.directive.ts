
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
import { Directive, Input, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';
 
@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;
 
  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController,
  ) { }
 
  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
  }
 
  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;
 
    if (scrollTop < 0) {
      return;
    }
    
    let newPosition = -scrollTop/2;
 
    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight;
    }
    let newOpacity = 1 - (newPosition / -this.headerHeight);
    
    
    this.domCtrl.write(() => {
      this.renderer.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.renderer.setStyle(c, 'opacity', newOpacity);
      }
    });
  }
}