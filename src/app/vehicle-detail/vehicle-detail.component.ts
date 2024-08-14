import { formatDate, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { ToastModule } from 'primeng/toast';
import { tempArray, Vehicle } from 'src/app/vehicle-detail/Vehicle';
import { MessageService } from 'primeng/api';

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
    ToastModule,
  ],
  providers: [MessageService],
})
export class VehicleDetailComponent implements OnInit {
  @Input({ required: true }) vehicle!: Vehicle;
  @Output() saveVehicle = new EventEmitter<Vehicle>();
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

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.vehicleForm.reset({
      Id: this.vehicle.Id,
      RegistrationPlate: this.vehicle.RegistrationPlate,
      Brand: this.vehicle.Brand,
      Model: this.vehicle.Model,
      RegistrationDate: formatDate(
        this.vehicle.RegistrationDate,
        'yyyy-MM-dd',
        'en'
      ),
      Mileage: this.vehicle.Mileage,
      IsInsured: this.vehicle.IsInsured,
      OwnerMail: this.vehicle.OwnerMail,
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
    this.saveVehicle.emit(vehicle);
    return;

    tempArray.push(vehicle);
    this.messageService.add({
      severity: 'success',
      summary: 'Gespeichert',
      detail: 'Fahrzeug wurde gespeichert',
    });
    console.log(tempArray);

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
