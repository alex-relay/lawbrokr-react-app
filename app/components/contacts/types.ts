

type ContactsFormInput = {
  company: string;
  country: string;
  city: string;
  state: string;
  employees: string;
  zipCode: string;
  website: string;
  salesRep: string;
  purchased: boolean;
  lastContacted: Date | null;
  revenue: string
};

export {ContactsFormInput}