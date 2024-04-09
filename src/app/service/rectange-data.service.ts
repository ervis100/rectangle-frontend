import {HttpClient} from "@angular/common/http";
import {Measurement} from "../model/meassurement.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RectangleDataService {
  constructor(private httpClient:HttpClient) {
  }

  getMeasurements() {
    return this.httpClient.get<Measurement>("https://localhost:7123/meassurements");
  }

  saveNewMeasurements(measurements: Measurement) {
    return this.httpClient.post("https://localhost:7123/meassurements", measurements);
  }
}
