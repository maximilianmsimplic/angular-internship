import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [VehicleManagementComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'vehicle-management';
}
