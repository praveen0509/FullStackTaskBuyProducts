import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NgFlashMessageService} from "ng-flash-messages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'app';
  constructor(private elementRef: ElementRef, private ngFlashMessageService: NgFlashMessageService){}

  ngAfterViewInit(): void {
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'lightgray';
  }

  ngOnInit() {
  }

}
