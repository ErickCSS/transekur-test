import { combineDateAndTimeInputs, toDateInputValue } from "../utils/shared-date-format.utils";

export type TripSeed = {
  clientName: string;
  clientPhone: string;
  pickupPoint: string;
  driverAuthEmail: string | null;
  scheduledAt: string;
};

// Made-up clients and pickup points, always scheduled for "today". Drivers are matched by email.
const todayTripSeeds = [
  {
    clientName: "Ana Rodríguez",
    clientPhone: "18095550201",
    pickupPoint: "Las Américas Airport, Terminal B",
    driverAuthEmail: "carlos.mendez@driver.test",
    time: "08:30",
  },
  {
    clientName: "José Martínez",
    clientPhone: "18095550202",
    pickupPoint: "Hotel Jaragua, main lobby",
    driverAuthEmail: "carlos.mendez@driver.test",
    time: "11:00",
  },
  {
    clientName: "María Gómez",
    clientPhone: "18095550203",
    pickupPoint: "Ágora Mall, door 3",
    driverAuthEmail: "laura.pena@driver.test",
    time: "15:45",
  },
  {
    clientName: "Pedro Castillo",
    clientPhone: "18095550204",
    pickupPoint: "Calle El Conde 101, Zona Colonial",
    driverAuthEmail: null,
    time: "18:20",
  },
];

export function buildTodayTripsSeed(today: Date): TripSeed[] {
  const todayInputValue = toDateInputValue(today);
  return todayTripSeeds.map(({ time, ...tripSeed }) => ({
    ...tripSeed,
    scheduledAt: combineDateAndTimeInputs(todayInputValue, time),
  }));
}
