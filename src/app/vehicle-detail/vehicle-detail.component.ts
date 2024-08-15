import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { Vehicle } from 'src/app/state/Vehicle';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    ButtonModule,
    ChipsModule,
  ],
})
export class VehicleDetailComponent implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  canEditId = false;
  vehicleForm = new FormGroup({
    Id: new FormControl('', Validators.required),
    RegistrationPlate: new FormControl('', Validators.required),
    Brand: new FormControl<string[] | null>(null, Validators.required),
    Model: new FormControl('', Validators.required),
    RegistrationDate: new FormControl(
      formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      Validators.required
    ),
    Mileage: new FormControl(0, Validators.required),
    IsInsured: new FormControl(false, Validators.required),
    OwnerMail: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const vehicle = this.dialogConfig.data.vehicle as Vehicle;
    if (vehicle === undefined) {
      console.error(
        'No Vehicle specified in vehicle details',
        this.dialogConfig,
        this.dialogRef
      );
    }
    this.canEditId = vehicle.id === '';
    this.vehicleForm.reset({
      Id: vehicle.id,
      RegistrationPlate: vehicle.registrationPlate,
      Brand: vehicle.brand,
      Model: vehicle.model,
      RegistrationDate: formatDate(
        vehicle.registrationDate,
        'yyyy-MM-dd',
        'en'
      ),
      Mileage: vehicle.mileage,
      IsInsured: vehicle.isInsured,
      OwnerMail: vehicle.ownerMail,
    });
  }

  onSave() {
    const data = this.vehicleForm.value;
    const vehicle = new Vehicle(
      data.Id ?? '',
      data.RegistrationPlate ?? '',
      (data.Brand?.filter((val) => typeof val === 'string') as
        | string[]
        | undefined) ?? [],
      data.Model ?? '',
      new Date(data.RegistrationDate ?? new Date()),
      data.Mileage ?? 0,
      data.IsInsured ?? false,
      data.OwnerMail ?? ''
    );
    this.dialogRef.close(vehicle);
  }
}
