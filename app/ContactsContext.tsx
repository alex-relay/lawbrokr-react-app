import { createContext, useContext, useEffect } from "react";
import { Contact, useGetContactList } from "./api/api";

type ContactsContextType = {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
};

export const ContactsContext = createContext<ContactsContextType | null>(null);

const ContactsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: contactsData = [], isLoading, isError } = useGetContactList();

  useEffect(() => {
    if (typeof window !== "undefined" && "sessionStorage" in window) {
      const savedData = sessionStorage.getItem("contactsData");

      if (!JSON.parse(savedData ?? "")) {
        sessionStorage.setItem("contactsData", JSON.stringify(contactsData));
      }
    }
  }, [contactsData]);

  return (
    <ContactsContext.Provider
      value={{ contacts: contactsData, isLoading, isError }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContextProvider;
