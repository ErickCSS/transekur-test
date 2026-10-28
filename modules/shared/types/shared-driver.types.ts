export type DriverVehicle = {
  make: string;
  model: string;
  color: string;
  plate: string;
};

export type Driver = {
  id: string;
  authEmail: string;
  fullName: string;
  phone: string;
  vehicle: DriverVehicle;
};
