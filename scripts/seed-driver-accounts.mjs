// Creates the made-up driver test accounts in Supabase Auth and their rows in `drivers`.
// Run once (safe to re-run): node --env-file=.env scripts/seed-driver-accounts.mjs
import { createClient } from "@supabase/supabase-js";

const driverTestPassword = "DriverDemo#2026";

const driverTestAccounts = [
  {
    email: "carlos.mendez@driver.test",
    fullName: "Carlos Méndez",
    phone: "18095550101",
    vehicle: { make: "Toyota", model: "Corolla", color: "Gray", plate: "A123456" },
  },
  {
    email: "laura.pena@driver.test",
    fullName: "Laura Peña",
    phone: "18095550102",
    vehicle: { make: "Hyundai", model: "Tucson", color: "White", plate: "G789012" },
  },
  {
    email: "miguel.santos@driver.test",
    fullName: "Miguel Santos",
    phone: "18095550103",
    vehicle: { make: "Kia", model: "Sportage", color: "Black", plate: "G345678" },
  },
];

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const { data: existingUsersPage, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();
if (listUsersError) throw listUsersError;

for (const driverTestAccount of driverTestAccounts) {
  let authUser = existingUsersPage.users.find((user) => user.email === driverTestAccount.email);

  if (!authUser) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: driverTestAccount.email,
      password: driverTestPassword,
      email_confirm: true,
      user_metadata: { full_name: driverTestAccount.fullName },
    });
    if (error) {
      console.error(`✗ ${driverTestAccount.email}: ${error.message}`);
      process.exitCode = 1;
      continue;
    }
    authUser = data.user;
  }

  const { error: upsertDriverError } = await supabaseAdmin.from("drivers").upsert(
    {
      auth_user_id: authUser.id,
      auth_email: driverTestAccount.email,
      full_name: driverTestAccount.fullName,
      phone: driverTestAccount.phone,
      vehicle_make: driverTestAccount.vehicle.make,
      vehicle_model: driverTestAccount.vehicle.model,
      vehicle_color: driverTestAccount.vehicle.color,
      vehicle_plate: driverTestAccount.vehicle.plate,
    },
    { onConflict: "auth_email" },
  );

  if (upsertDriverError) {
    console.error(`✗ ${driverTestAccount.email}: ${upsertDriverError.message}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${driverTestAccount.email}`);
  }
}
