"use client";

import { useContactsContext } from "app/ContactsContext";
import CryptoPrice from "../charts/Price";
import VolumePriceCorrelation from "../charts/VolumePriceCorrelation";
import ContactsTable from "../contacts/ContactsTable";

const Dashboard = () => {
  const { contacts, isLoading } = useContactsContext();
  return (
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
  );
};

export default Dashboard;
