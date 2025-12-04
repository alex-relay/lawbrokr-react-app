"use client";

import { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Contact, useGetContactList } from "../../api/api";

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
}: {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
}) => {
  const columnDefs = useMemo(() => {
    return getColumnDefs(contacts);
  }, [contacts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "500px" }}>
      <AgGridReact columnDefs={columnDefs} rowData={contacts} />
    </div>
  );
};

export default ContactsTable;
