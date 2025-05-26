import Budget from "@/components/Budget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propuesta de Servicios - Geome7ric",
  description: "Propuesta personalizada de servicios de Geome7ric",
};

export default function BudgetPage() {
  return <Budget />;
}
