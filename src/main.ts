import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { VehicleListReducer } from './app/state/vehiclesList.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideStore(),
    provideState({ name: 'vehicles', reducer: VehicleListReducer }),
  ],
}).catch((err) => console.error(err));
