import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
