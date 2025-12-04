"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Contact, useGetContactList } from "./api/api";

type ContactsContextType = {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  updateContacts: (data: Contact[]) => void;
};

const ContactsContext = createContext<ContactsContextType | null>(null);

export const useContactsContext = () => {
  const currentNavContext = useContext(ContactsContext);

  if (!currentNavContext) {
    throw new Error(
      "useContactsContext has to be used within <NavContext.Provider>",
    );
  }

  return currentNavContext;
};

const ContactsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: apiData, isLoading: apiLoading, isError } = useGetContactList();

  const [contacts, setContacts] = useState<Contact[]>([]);
  useEffect(() => {
    const currentContacts = sessionStorage.getItem("contactsData");

    if (contacts.length > 0) return;

    if (!!currentContacts) {
      const parsedCurrentContacts = JSON.parse(currentContacts ?? "[]");
      setContacts(parsedCurrentContacts);
    } else if (!!apiData?.length) {
      sessionStorage.setItem("contactsData", JSON.stringify(apiData));
      setContacts(apiData);
    }
  }, [contacts, apiData]);

  const updateContacts = (newContacts: Contact[]) => {
    setContacts(newContacts);
    sessionStorage.setItem("contactsData", JSON.stringify(newContacts));
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        updateContacts,
        isLoading: apiLoading,
        isError,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContextProvider;
