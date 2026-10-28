// Creates the made-up driver test accounts in Supabase Auth.
// Run once: node --env-file=.env scripts/seed-driver-accounts.mjs
import { createClient } from "@supabase/supabase-js";

const driverTestPassword = "DriverDemo#2026";

const driverTestAccounts = [
  { email: "carlos.mendez@driver.test", fullName: "Carlos Méndez" },
  { email: "laura.pena@driver.test", fullName: "Laura Peña" },
  { email: "miguel.santos@driver.test", fullName: "Miguel Santos" },
];

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

for (const driverTestAccount of driverTestAccounts) {
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email: driverTestAccount.email,
    password: driverTestPassword,
    email_confirm: true,
    user_metadata: { full_name: driverTestAccount.fullName },
  });

  const wasAlreadyCreated = error?.message.toLowerCase().includes("already");
  if (error && !wasAlreadyCreated) {
    console.error(`✗ ${driverTestAccount.email}: ${error.message}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${driverTestAccount.email}${wasAlreadyCreated ? " (already existed)" : ""}`);
  }
}
