import ContactPage from "@/features/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Join Us | Sportmantle",
  description: "Get in touch with Sportmantle. Apply for discipleship, partner with us to seed into our mission, or register to join our next outreach or event in Abuja.",
};

export default function Page() {
  return <ContactPage />;
}
