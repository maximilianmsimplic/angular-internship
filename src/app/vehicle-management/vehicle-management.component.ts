import { formatDate, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Vehicle } from 'src/app/vehicle-management/Vehicle';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.scss'],
  imports: [NgFor, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleManagementComponent {
  vehicleForm = new FormGroup({
    Id: new FormControl('', Validators.required),
    RegistrationPlate: new FormControl('', Validators.required),
    Brand: new FormControl('', Validators.required), //new FormArray([new FormControl('', Validators.required)]),
    Model: new FormControl('', Validators.required),
    RegistrationDate: new FormControl(
      formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      Validators.required
    ),
    Mileage: new FormControl(0, Validators.required),
    IsInsured: new FormControl(false, Validators.required),
    OwnerMail: new FormControl('', Validators.required),
  });
  tempArray: Vehicle[] = [];
  onSave() {
    const data = this.vehicleForm.value;
    const vehicle = new Vehicle(
      data.Id ?? '',
      data.RegistrationPlate ?? '',
      data.Brand?.split(',').map((val) => val.trim()) ?? [],
      data.Model ?? '',
      new Date(data.RegistrationDate ?? new Date()),
      data.Mileage ?? 0,
      data.IsInsured ?? false,
      data.OwnerMail ?? ''
    );
    this.tempArray.push(vehicle);
    this.vehicleForm.setValue({
      Id: '',
      RegistrationPlate: '',
      Brand: '',
      Model: '',
      RegistrationDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      Mileage: 0,
      IsInsured: false,
      OwnerMail: '',
    });
    console.log(this.tempArray);
  }
}
