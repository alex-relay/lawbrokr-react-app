import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, within, waitFor } from "@testing-library/react";
import ContactsFormPage from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContactsContextProvider from "app/ContactsContext";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { contactsList } from "app/test-utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const sessionStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

describe("Home page", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });

  const queryClient = new QueryClient();

  const renderContactsFormPage = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactsContextProvider>
          <ContactsFormPage />
        </ContactsContextProvider>
      </QueryClientProvider>,
    );
  };

  it("renders the contact form and validates the user input on empty fields when the user tries to add a contact", async () => {
    renderContactsFormPage();

    const user = userEvent.setup();

    expect(await screen.findByText("Table Entry Form"));

    const addEntryButton = await screen.findByText("Add Entry");

    await user.click(addEntryButton);

    expect(await screen.findByText("Website must be a valid url"));
    expect(await screen.findByText("Zip code must be in a valid format"));
    expect(await screen.findByText("State is required"));
    expect(await screen.findByText("Country must be USA"));
    expect(await screen.findByText("Company name is required"));
    expect(await screen.findByText("Date is required"));
    expect(await screen.findByText("City is required"));
    expect(await screen.findByText("Sales rep name is required"));
    expect(await screen.findByText("Revenue number is required"));
  });

  it("fills out the contact form and updates an entry", async () => {
    renderContactsFormPage();

    const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
    window.sessionStorage.setItem("contactsData", JSON.stringify(contactsList));

    const user = userEvent.setup();

    expect(await screen.findByText("Table Entry Form"));

    const addEntryButton = await screen.findByText("Add Entry");

    const countryInput = screen.getByLabelText("Country");
    await userEvent.type(countryInput, "Guinea-Bissau");

    expect(
      await screen.findByDisplayValue("Guinea-Bissau"),
    ).toBeInTheDocument();

    const companyInput = screen.getByLabelText("Company");
    await userEvent.type(companyInput, "Carroll PLC");

    expect(await screen.findByDisplayValue("Carroll PLC")).toBeInTheDocument();

    const zipCodeInput = screen.getByLabelText("Zip Code");
    await userEvent.type(zipCodeInput, "78554-4817");

    expect(await screen.findByDisplayValue("78554-4817")).toBeInTheDocument();

    const employeesInput = screen.getByLabelText("Employees");
    await userEvent.type(employeesInput, "35");

    expect(await screen.findByDisplayValue("35")).toBeInTheDocument();

    const revenueInput = screen.getByLabelText("Revenue");
    await userEvent.type(revenueInput, "67");

    expect(await screen.findByDisplayValue("67")).toBeInTheDocument();

    const stateInput = screen.getByLabelText("State");
    await userEvent.type(stateInput, "Michigan");

    expect(await screen.findByDisplayValue("Michigan")).toBeInTheDocument();

    const cityInput = screen.getByLabelText("City");
    await userEvent.type(cityInput, "North Reinaview");

    const websiteInput = screen.getByLabelText("Website");
    await userEvent.type(websiteInput, "https://www.tsn.ca");

    expect(
      await screen.findByDisplayValue("https://www.tsn.ca"),
    ).toBeInTheDocument();

    const salesRepInput = screen.getByLabelText("Sales Rep");
    await userEvent.type(salesRepInput, "Linda");

    expect(await screen.findByDisplayValue("Linda")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Last Contacted"));

    await user.click(await screen.findByText("Today"));

    await user.click(addEntryButton);

    const updatedEntryObject = {
      id: 11,
      company: "Carroll PLC",
      country: "Guinea-Bissau",
      city: "North Reinaview",
      state: "Michigan",
      employees: 35,
      zipcode: "78554-4817",
      website: "https://www.tsn.ca",
      sales_rep: "Linda",
      purchased: false,
      last_contacted: new Date().toLocaleDateString(),
      revenue: 67,
    };

    const updatedContactsList = [
      ...contactsList.filter((contact) => contact.id !== 2),
      updatedEntryObject,
    ];

    expect(await setItemSpy).toHaveBeenCalledWith(
      "contactsData",
      JSON.stringify(updatedContactsList),
    );
  });

  it("fills out the contact form and submits a new entry", async () => {
    renderContactsFormPage();

    const setItemSpy = jest.spyOn(window.sessionStorage, "setItem");
    window.sessionStorage.setItem("contactsData", JSON.stringify(contactsList));

    const user = userEvent.setup();

    expect(await screen.findByText("Table Entry Form"));

    const addEntryButton = await screen.findByText("Add Entry");

    const countryInput = screen.getByLabelText("Country");
    await userEvent.type(countryInput, "USA");

    expect(await screen.findByDisplayValue("USA")).toBeInTheDocument();

    const companyInput = screen.getByLabelText("Company");
    await userEvent.type(companyInput, "XYZ Inc");

    expect(await screen.findByDisplayValue("XYZ Inc")).toBeInTheDocument();

    const zipCodeInput = screen.getByLabelText("Zip Code");
    await userEvent.type(zipCodeInput, "20016");

    expect(await screen.findByDisplayValue("20016")).toBeInTheDocument();

    const employeesInput = screen.getByLabelText("Employees");
    await userEvent.type(employeesInput, "78");

    expect(await screen.findByDisplayValue("78")).toBeInTheDocument();

    const revenueInput = screen.getByLabelText("Revenue");
    await userEvent.type(revenueInput, "28");

    expect(await screen.findByDisplayValue("28")).toBeInTheDocument();

    const stateInput = screen.getByLabelText("State");
    await userEvent.type(stateInput, "Hawaii");

    expect(await screen.findByDisplayValue("Hawaii")).toBeInTheDocument();

    const cityInput = screen.getByLabelText("City");
    await userEvent.type(cityInput, "Honolulu");

    expect(await screen.findByDisplayValue("Honolulu")).toBeInTheDocument();

    const websiteInput = screen.getByLabelText("Website");
    await userEvent.type(websiteInput, "https://www.tsn.ca");

    expect(
      await screen.findByDisplayValue("https://www.tsn.ca"),
    ).toBeInTheDocument();

    const salesRepInput = screen.getByLabelText("Sales Rep");
    await userEvent.type(salesRepInput, "Linda");

    expect(await screen.findByDisplayValue("Linda")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Last Contacted"));

    await user.click(await screen.findByText("Today"));

    await user.click(addEntryButton);

    const newEntryObject = {
      id: 11,
      company: "XYZ Inc",
      country: "USA",
      city: "Honolulu",
      state: "Hawaii",
      employees: 78,
      zipcode: "20016",
      website: "https://www.tsn.ca",
      sales_rep: "Linda",
      purchased: false,
      last_contacted: new Date().toLocaleDateString(),
      revenue: 28,
    };

    const updatedContactsList = JSON.stringify([
      ...contactsList,
      newEntryObject,
    ]);

    expect(await setItemSpy).toHaveBeenLastCalledWith(
      "contactsData",
      updatedContactsList,
    );
  });
});
