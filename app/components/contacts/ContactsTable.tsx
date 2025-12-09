"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { Contact } from "../../api/api";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { useRouter } from "next/navigation";

const getColumnDefs = (data: Contact[]) => {
  if (!data || data.length === 0) {
    return [];
  }

  return Object.keys(data[0])
    .filter((key) => key !== "id")
    .map((key: string) => {

      return {
        field: key as keyof Contact,
        cellClass: "text-my-brand-primary",
        headerStyle: { color: "#250D53" }
      };
    });
};

const ContactsTable = ({
  contacts,
  isLoading,
  title = "Contacts",
}: {
  contacts: Contact[];
  isLoading: boolean;
  title?: string;
}) => {
  const router = useRouter();

  const columnDefs = useMemo(() => {
    return getColumnDefs(contacts);
  }, [contacts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const customTheme = createTheme({
    button: {
      base: "flex gap-2",
      color: {
        primary:
          "bg-my-brand-primary hover:text-my-brand-primary cursor-pointer text-white hover:bg-gray-200",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <div className="flex h-100 w-full flex-col gap-4" data-testid="contacts-table">
        <div className="flex justify-between">
          <h1 className="text-[var(--color-my-brand-primary)]">
            {" "}
            <b>{title}</b>
          </h1>
          <Button
            size="sm"
            pill
            color="primary"
            onClick={() => {
              router.push("/contacts/new")
            }}
          >
            {" "}
            Add Table Entry{" "}
          </Button>
        </div>
        <AgGridReact
          rowHeight={50}
          columnDefs={columnDefs}
          rowData={contacts}
        />
      </div>
    </ThemeProvider>
  );
};

export default ContactsTable;
