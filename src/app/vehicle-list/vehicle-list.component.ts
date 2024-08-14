import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicle-detail/Vehicle';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    VehicleDetailComponent,
    TableModule,
    ButtonModule,
    DialogModule,
  ],
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];
  editVehicle: Vehicle | undefined;
  isNewVehicle = false;
  deleteVehicleIndex: number | undefined;

  get indexedVehicles() {
    return this.vehicles.map((val, index) => ({ ...val, index }));
  }

  onAdd() {
    this.isNewVehicle = true;
    this.editVehicle = new Vehicle('', '', [], '', new Date(), 0, false, '');
  }
  onEdit() {
    console.log('Index:');
    return;
    this.isNewVehicle = false;
    //this.editVehicle = this.vehicles[index];
  }
  onCancel() {
    this.editVehicle = undefined;
  }
  onSave(vehicle: Vehicle) {
    if (this.isNewVehicle) {
      this.vehicles.push(vehicle);
    } else if (this.editVehicle !== undefined) {
      Object.assign(this.editVehicle, vehicle);
    }
    this.editVehicle = undefined;
    this.isNewVehicle = false;
  }
  onDelete(index: number) {}
  onConfirmDelete() {}
}
