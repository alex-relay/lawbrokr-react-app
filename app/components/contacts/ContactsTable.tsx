"use client";

import { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Contact, useGetContactList } from "../../api/api";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

const getColumnDefs = (data: Contact[]) => {
  if (!data || data.length === 0) {
    return [];
  }

  return Object.keys(data[0]).map((key: string) => {
    return {
      field: key as keyof Contact,
    };
  });
};

const ContactsTable = ({
  contacts,
  isLoading,
  isError,
  title = "Contacts",
}: {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  title?: string;
}) => {
  const router = useRouter();

  const columnDefs = useMemo(() => {
    return getColumnDefs(contacts);
  }, [contacts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-100 w-full flex-col gap-4">
      <div className="flex justify-between">
        <h1>
          {" "}
          <b>{title}</b>
        </h1>
        <Button onClick={() => router.push("/contacts")}>
          {" "}
          Add Table Entry{" "}
        </Button>
      </div>
      <AgGridReact columnDefs={columnDefs} rowData={contacts} />
    </div>
  );
};

export default ContactsTable;
