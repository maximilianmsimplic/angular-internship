import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [VehicleListComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'vehicle-management';
}
