"use client";

import ContactsForm from "./ContactsForm";
import ContactsTable from "./ContactsTable";
import { useGetContactList } from "../../api/api";
import { useEffect, useState } from "react";
import { useNavContext } from "../../ContactsContext";

const ContactsContainer = () => {
  // const { data: contactsData = [], isLoading, isError } = useGetContactList();

  const { isLoading, isError } = useNavContext();

  const [contactsData, setContactsData] = useState<any[]>([]);

  useEffect(() => {
    const savedData = sessionStorage.getItem("contactsData");
    if (savedData) {
      setContactsData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {contactsData?.length ? (
        <ContactsForm onContactsDataChange={setContactsData} />
      ) : null}

      <ContactsTable
        contacts={contactsData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default ContactsContainer;
