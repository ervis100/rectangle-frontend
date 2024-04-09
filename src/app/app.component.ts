import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RectangleDataService} from "./service/rectange-data.service";
import {Observable} from "rxjs";
import {Measurement} from "./model/meassurement.model";
import {CommonModule} from "@angular/common";
import {ResizableSvgDirective} from "./directive/ResizableSvgDirective";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ResizableSvgDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'RectangeApp';

  public perimeter = 0;
  public measurements: Observable<{ height: number; width: number }>;

  constructor(
    private rectangleDataService: RectangleDataService) {
  }

  ngOnInit() {
    this.measurements = this.rectangleDataService.getMeasurements();
  }

  onPerimeterChanged(event: number) {
    this.perimeter = event;
  }

  saveMeasurements(_width: string, _height: string) {
    let width = parseInt(_width.slice(0,-2));
    let height = parseInt(_height.slice(0,-2));
    console.log(_width)
    console.log(height)

    this.rectangleDataService.saveNewMeasurements(
      new Measurement(width, height)
    ).subscribe(value => {
      alert("saved")
    });
  }
}
