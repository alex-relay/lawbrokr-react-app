"use client";

import ContactsForm from "./ContactsForm";
import { useContactsContext } from "../../ContactsContext";

const ContactsFormContainer = () => {
  const { updateContacts } = useContactsContext();

  return (
    <div className="rounded-sm border border-solid p-4">
      <ContactsForm onContactsDataChange={updateContacts} />
    </div>
  );
};

export default ContactsFormContainer;
