import { formatDate, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
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
import { ToastModule } from 'primeng/toast';
import { Vehicle } from 'src/app/vehicle-management/Vehicle';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    ButtonModule,
    ChipsModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class VehicleManagementComponent {
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
  tempArray: Vehicle[] = [];

  constructor(private messageService: MessageService) {}

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

    this.tempArray.push(vehicle);
    this.messageService.add({
      severity: 'success',
      summary: 'Gespeichert',
      detail: 'Fahrzeug wurde gespeichert',
    });
    console.log(this.tempArray);

    this.vehicleForm.reset({
      Id: '',
      RegistrationPlate: '',
      Brand: [],
      Model: '',
      RegistrationDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      Mileage: 0,
      IsInsured: false,
      OwnerMail: '',
    });
  }
}
