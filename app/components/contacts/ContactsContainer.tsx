"use client";

import ContactsForm from "./ContactsForm";
import ContactsTable from "./ContactsTable";
import { useContactsContext } from "../../ContactsContext";

const ContactsContainer = () => {
  const { updateContacts } = useContactsContext();

  return (
    <div className="rounded-sm border border-solid p-4">
      <ContactsForm onContactsDataChange={updateContacts} />
    </div>
  );
};

export default ContactsContainer;
