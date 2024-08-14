import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Vehicle } from './state/Vehicle';

@Injectable()
export class VehicleService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';

  getAll() {
    return this.http.get<Vehicle[]>(this.url + '/vehicles');
  }
  add(vehicle: Vehicle) {
    return this.http.post(this.url + '/vehicles', vehicle);
  }
  update(oldId: string, vehicle: Vehicle) {
    return this.http.put(this.url + '/vehicles/' + oldId, vehicle);
  }
  delete(vehicle: Vehicle) {
    return this.http.delete(this.url + '/vehicles/' + vehicle.id);
  }
}
