import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../vehicle-detail/Vehicle';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];
  editVehicle: Vehicle | undefined;
  isNewVehicle = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  get indexedVehicles() {
    return this.vehicles.map((val, index) => ({ ...val, index }));
  }

  onAdd() {
    this.isNewVehicle = true;
    this.editVehicle = new Vehicle('', '', [], '', new Date(), 0, false, '');
  }
  onEdit(index: number) {
    this.isNewVehicle = false;
    this.editVehicle = this.vehicles[index];
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
    this.messageService.add({
      severity: 'success',
      summary: 'Gespeichert',
      detail: 'Fahrzeug wurde gespeichert',
    });
  }
  onDelete(index: number) {
    const vehicleId = this.vehicles[index].Id;
    this.confirmationService.confirm({
      header: 'Fahrzeug löschen',
      message: `Möchtest du das Fahrzeug mit Id: ${vehicleId} wirklich löschen?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.vehicles.splice(index, 1);
        this.messageService.add({
          severity: 'info',
          summary: 'Gelöscht',
          detail: 'Fahrzeug wurde gelöscht',
        });
      },
    });
  }
}
