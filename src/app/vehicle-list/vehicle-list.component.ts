import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../state/Vehicle';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];
  editVehicle: Vehicle | undefined;
  isNewVehicle = false;

  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  dialogService = inject(DialogService);
  dialogRef: DynamicDialogRef | undefined;

  get indexedVehicles() {
    return this.vehicles.map((val, index) => ({ ...val, index }));
  }

  onAdd() {
    this.dialogRef = this.dialogService.open(VehicleDetailComponent, {
      header: 'Neues Fahrzeug hinzufügen',
      width: '80vw',
      data: {
        vehicle: new Vehicle('', '', [], '', new Date(), 0, false, ''),
      },
    });
    this.dialogRef.onClose.subscribe((vehicle?: Vehicle) => {
      if (vehicle) {
        this.vehicles.push(vehicle);
        this.messageService.add({
          severity: 'success',
          summary: 'Gespeichert',
          detail: 'Neues Fahrzeug wurde gespeichert',
        });
      }
    });
  }

  onEdit(index: number) {
    this.dialogRef = this.dialogService.open(VehicleDetailComponent, {
      header: 'Fahrzeugdetails',
      width: '80vw',
      data: {
        vehicle: this.vehicles[index],
      },
    });
    this.dialogRef.onClose.subscribe((vehicle?: Vehicle) => {
      if (vehicle) {
        this.vehicles.push(vehicle);
        this.messageService.add({
          severity: 'success',
          summary: 'Gespeichert',
          detail: 'Fahrzeug wurde gespeichert',
        });
      }
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
