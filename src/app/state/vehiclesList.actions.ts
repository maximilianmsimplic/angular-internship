import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vehicle } from './Vehicle';

export const VehicleActions = createActionGroup({
  source: 'Vehicles',
  events: {
    'Load Vehicles': props<{ vehicles: Vehicle[] }>(),
    'Add Vehicle': props<{ vehicle: Vehicle }>(),
    'Edit Vehicle': props<{ vehicle: Vehicle }>(),
    'Delete Vehicle': props<{ id: string }>(),
  },
});
