import { createReducer, on } from '@ngrx/store';
import { Vehicle } from './Vehicle';
import { VehicleActions } from './vehiclesList.actions';

export const initialState: Vehicle[] = [];

export const VehicleListReducer = createReducer(
  initialState,
  on(VehicleActions.addVehicle, (state, action) => [...state, action.vehicle]),
  on(VehicleActions.editVehicle, (state, action) => {
    const shallowCopy = [...state];
    shallowCopy[action.index] = action.vehicle;
    return shallowCopy;
  }),
  on(VehicleActions.deleteVehicle, (state, action) => {
    const shallowCopy = [...state];
    state.splice(action.index, 1);
    return shallowCopy;
  })
);
