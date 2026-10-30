import { combineDateAndTimeInputs, getNextDateInputValue, toDateInputValue } from "../utils/shared-date-format.utils";

export type TripSeed = {
  clientName: string;
  clientPhone: string;
  pickupPoint: string;
  driverAuthEmail: string | null;
  scheduledAt: string;
};

type DemoTripSeed = Omit<TripSeed, "scheduledAt"> & {
  day: "today" | "tomorrow";
  time: string;
};

// Made-up clients and pickup points for "today" and "tomorrow". Drivers are matched by email.
// Pickups are close together so a reviewer never waits hours for the next one.
const demoTripSeeds: DemoTripSeed[] = [
  {
    day: "today",
    clientName: "Ana Rodríguez",
    clientPhone: "18095550201",
    pickupPoint: "Las Américas Airport, Terminal B",
    driverAuthEmail: "carlos.mendez@driver.test",
    time: "08:30",
  },
  {
    day: "today",
    clientName: "José Martínez",
    clientPhone: "18095550202",
    pickupPoint: "Hotel Jaragua, main lobby",
    driverAuthEmail: "laura.pena@driver.test",
    time: "09:10",
  },
  {
    day: "today",
    clientName: "Luis Fernández",
    clientPhone: "18095550203",
    pickupPoint: "Blue Mall, Av. Winston Churchill entrance",
    driverAuthEmail: "miguel.santos@driver.test",
    time: "10:30",
  },
  {
    day: "today",
    clientName: "María Gómez",
    clientPhone: "18095550204",
    pickupPoint: "Ágora Mall, door 3",
    driverAuthEmail: "carlos.mendez@driver.test",
    time: "14:00",
  },
  {
    day: "today",
    clientName: "Sofía Herrera",
    clientPhone: "18095550205",
    pickupPoint: "Malecón, Plaza Juan Barón",
    driverAuthEmail: "laura.pena@driver.test",
    time: "14:45",
  },
  {
    day: "today",
    clientName: "Pedro Castillo",
    clientPhone: "18095550206",
    pickupPoint: "Calle El Conde 101, Zona Colonial",
    driverAuthEmail: null,
    time: "15:30",
  },
  {
    day: "tomorrow",
    clientName: "Carmen Díaz",
    clientPhone: "18095550207",
    pickupPoint: "Las Américas Airport, Terminal A",
    driverAuthEmail: "carlos.mendez@driver.test",
    time: "08:00",
  },
  {
    day: "tomorrow",
    clientName: "Ramón Polanco",
    clientPhone: "18095550208",
    pickupPoint: "Hotel Embajador, main entrance",
    driverAuthEmail: "miguel.santos@driver.test",
    time: "08:45",
  },
  {
    day: "tomorrow",
    clientName: "Isabel Vargas",
    clientPhone: "18095550209",
    pickupPoint: "Sambil, Av. John F. Kennedy entrance",
    driverAuthEmail: "laura.pena@driver.test",
    time: "14:30",
  },
];

export function buildDemoTripsSeed(today: Date): TripSeed[] {
  const todayInputValue = toDateInputValue(today);
  const dateInputValueByDay = {
    today: todayInputValue,
    tomorrow: getNextDateInputValue(todayInputValue),
  };

  return demoTripSeeds.map(({ day, time, ...tripSeed }) => ({
    ...tripSeed,
    scheduledAt: combineDateAndTimeInputs(dateInputValueByDay[day], time),
  }));
}
