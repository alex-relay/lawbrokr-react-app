"use client";
import CryptoPrice from "./components/charts/Price";
import VolumePriceCorrelation from "./components/charts/VolumePriceCorrelation";
import ContactsTable from "./components/contacts/ContactsTable";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-center bg-white px-4 py-24">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <CryptoPrice />
        </div>
        <div className="flex-1">
          <VolumePriceCorrelation />
        </div>
      </div>
      <div>
        <ContactsTable />
      </div>
    </main>
  );
}
