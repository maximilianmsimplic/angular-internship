import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
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
import { firstValueFrom, lastValueFrom, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { VehicleActions } from '../state/vehiclesList.actions';
import { VehicleService } from '../vehicle.service';

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
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    VehicleService,
  ],
})
export class VehicleListComponent implements OnInit {
  api = inject(VehicleService);
  store = inject(Store<{ vehicles: Vehicle[] }>);
  vehicles$: Observable<Vehicle[]> = this.store.select('vehicles');

  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  dialogService = inject(DialogService);
  dialogRef: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.api
      .getAll()
      .subscribe((vehicles) =>
        this.store.dispatch(VehicleActions.loadVehicles({ vehicles }))
      );
  }

  onAdd() {
    this.dialogRef = this.dialogService.open(VehicleDetailComponent, {
      header: 'Neues Fahrzeug hinzufügen',
      width: '80vw',
      data: {
        vehicle: new Vehicle('', '', [], '', new Date(), 0, false, ''),
      },
    });
    this.dialogRef.onClose.subscribe(async (vehicle?: Vehicle) => {
      if (vehicle) {
        const vehicles = await firstValueFrom(this.vehicles$);
        if (vehicles.some((val) => val.id === vehicle.id)) {
          this.messageService.add({
            severity: 'error',
            summary: 'Doppelte Id',
            detail: 'Fehrzeug enthält eine vorhandene Id',
          });
        } else {
          this.api.add(vehicle).subscribe(() => {
            this.store.dispatch(VehicleActions.addVehicle({ vehicle }));
            console.log(JSON.stringify(vehicle));
            this.messageService.add({
              severity: 'success',
              summary: 'Gespeichert',
              detail: 'Neues Fahrzeug wurde gespeichert',
            });
          });
        }
      }
    });
  }

  async onEdit(vehicle: Vehicle) {
    this.dialogRef = this.dialogService.open(VehicleDetailComponent, {
      header: 'Fahrzeugdetails',
      width: '80vw',
      data: {
        vehicle: vehicle,
      },
    });
    this.dialogRef.onClose.subscribe((vehicle?: Vehicle) => {
      if (vehicle) {
        this.api.update(vehicle).subscribe(() => {
          this.store.dispatch(VehicleActions.editVehicle({ vehicle }));
          this.messageService.add({
            severity: 'success',
            summary: 'Gespeichert',
            detail: 'Fahrzeug wurde gespeichert',
          });
        });
      }
    });
  }

  async onDelete(id: string) {
    this.confirmationService.confirm({
      header: 'Fahrzeug löschen',
      message: `Möchtest du das Fahrzeug mit Id: ${id} wirklich löschen?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.delete(id).subscribe(() => {
          this.store.dispatch(VehicleActions.deleteVehicle({ id }));
          this.messageService.add({
            severity: 'info',
            summary: 'Gelöscht',
            detail: 'Fahrzeug wurde gelöscht',
          });
        });
      },
    });
  }
}
