import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appResizableSvg]',
  standalone: true
})
export class ResizableSvgDirective implements OnInit{

  ngOnInit() {
    this.outputPerimeter();
  }

  @Output() perimeterChanged = new EventEmitter<number>();

  private isResizing = false;
  private initialWidth = 0;
  private initialHeight = 0;
  private resizeThreshold = 10; // Threshold for resizing, adjust as needed
  private mouseX:number = null;
  private mouseY:number = null;

  constructor(private elementRef: ElementRef<SVGElement>) {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    const isOnBorder = this.mouseX < this.resizeThreshold || this.mouseY < this.resizeThreshold ||
      rect.width - this.mouseX < this.resizeThreshold || rect.height - this.mouseY < this.resizeThreshold;

      if (isOnBorder) {
      this.isResizing = true;
      this.initialWidth = parseInt(this.elementRef.nativeElement.getAttribute("width"));
      this.initialHeight =  parseInt(this.elementRef.nativeElement.getAttribute("height"));
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing) {
      const newPositionX = event.clientX;
      const newPositionY = event.clientY;
      this.elementRef.nativeElement.setAttribute('width', `${this.initialWidth + newPositionX - this.mouseX}px`);
      this.elementRef.nativeElement.setAttribute('height', `${this.initialHeight + newPositionY - this.mouseY}px`);

      this.outputPerimeter();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  outputPerimeter() {
    let measurements = this.elementRef.nativeElement.getBoundingClientRect()
    let perimeter = (measurements.width+measurements.height)*2;
    this.perimeterChanged.emit(parseInt(String(perimeter)));
  }
}
