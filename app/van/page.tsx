import { redirect } from "next/navigation";

export const metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function VanLoginRedirect() {
  redirect("/login");
}
