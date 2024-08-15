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
  update(vehicle: Vehicle) {
    return this.http.put(this.url + '/vehicles/' + vehicle.id, vehicle);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/vehicles/' + id);
  }
}
