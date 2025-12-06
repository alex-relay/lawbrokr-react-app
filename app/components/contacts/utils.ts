import { Contact } from "../../api/api";
import { ContactsFormInput } from "./types";

const getIsURL = (text: string) => {
  if (!text) {
    return false;
  }
  return URL.canParse(text);
};

const getIsValidNumber = (data: string) => {
  if (!data) {
    return false;
  }

  const number = Number(data);

  return number >= 0 || "Number must not be negative";
};

const transformFormData = (formData: ContactsFormInput, id: number) => {
  if (!formData) {
    return;
  }

  const data = {} as Record<string, unknown>;
  data["id"] = id

  Object.entries(formData).forEach(([key, value]) => {
    if (key === "zipCode" && value !== null && typeof value === "string") {
      data["zipcode"] = value;
      return
    }

    if (
      key === "lastContacted" &&
      value !== null &&
      typeof value === "string"
    ) {
      data["last_contacted"] = value;
      return
    }

    if (key === "salesRep" && value !== null && typeof value === "string") {
      data["sales_rep"] = value;
      return
    }

    data[key] = value;
  });

  return data as Contact;
};
export { getIsURL, getIsValidNumber, transformFormData };
