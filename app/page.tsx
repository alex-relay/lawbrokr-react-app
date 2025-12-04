"use client";
import CryptoPrice from "./components/charts/Price";
import VolumePriceCorrelation from "./components/charts/VolumePriceCorrelation";
import ContactsContainer from "./components/contacts/ContactsContainer";
import ContactsTable from "./components/contacts/ContactsTable";
import { useContactsContext } from "./ContactsContext";

export default function Home() {
  const { contacts, isLoading, isError } = useContactsContext();
  return (
    <main className="flex flex-col min-h-screen gap-4 bg-white px-4 py-6">
        <h1>
          <b>Bitcoin Price and Volatility Charts</b>
        </h1>
      <div className="mb-5 flex w-full flex-col gap-4 lg:flex-row">
        <CryptoPrice />
        <VolumePriceCorrelation />
      </div>
        <ContactsTable
          contacts={contacts}
          isLoading={isLoading}
          isError={isError}
        />
    </main>
  );
}
