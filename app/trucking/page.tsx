import { redirect } from "next/navigation";

/* Legacy /trucking entry point — predates the per-product landings.
   Redirect to /trucking-working-capital, the live product hub closest
   to what "trucking capital" means in the marketing nav. */
export default function TruckingPage() {
  redirect("/trucking-working-capital");
}
