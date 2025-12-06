"use client";
import CryptoPrice from "./components/charts/Price";
import VolumePriceCorrelation from "./components/charts/VolumePriceCorrelation";
import ContactsTable from "./components/contacts/ContactsTable";
import NavigationBar from "./components/navigation/Navbar";
import { useContactsContext } from "./ContactsContext";

export default function Home() {
  const { contacts, isLoading } = useContactsContext();
  return (
    <div className="flex">
      <NavigationBar />
      <main className="flex min-h-screen w-full flex-col gap-4 px-10 py-6">
        <h1 className="text-[var(--color-my-brand-primary)]">
          <b>Bitcoin Price and Volatility Charts</b>
        </h1>
        <div className="mb-5 flex w-full flex-col gap-4 lg:flex-row">
          <CryptoPrice />
          <VolumePriceCorrelation />
        </div>
        <ContactsTable contacts={contacts} isLoading={isLoading} />
      </main>
    </div>
  );
}
