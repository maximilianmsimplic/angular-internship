import { createReducer, on } from '@ngrx/store';
import { Vehicle } from './Vehicle';
import { VehicleActions } from './vehiclesList.actions';

export const initialState: Vehicle[] = [];

export const VehicleListReducer = createReducer(
  initialState,
  on(VehicleActions.loadVehicles, (_state, action) => action.vehicles),
  on(VehicleActions.addVehicle, (state, action) => [...state, action.vehicle]),
  on(VehicleActions.editVehicle, (state, action) => {
    return state.map((val) =>
      val.id === action.vehicle.id ? action.vehicle : val
    );
  }),
  on(VehicleActions.deleteVehicle, (state, action) => {
    return state.filter((val) => val.id !== action.id);
  })
);
