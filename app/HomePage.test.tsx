import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, within, waitFor } from "@testing-library/react";
import Home from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContactsContextProvider from "./ContactsContext";

import { contactsList } from "./test-utils";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-apexchart" />,
}));

const contactsListWithoutId = Object.fromEntries(
  Object.entries(contactsList[0]).filter(([key, ]) => key !== "id"),
);

const tableHeaders = Object.keys(contactsListWithoutId).map(
  (header) => `${header[0].toUpperCase()}${header.slice(1)}`,
);

const firstRow = Object.values(contactsListWithoutId).filter(
  (value) => typeof value !== "boolean",
);

describe("Home page", () => {
  const queryClient = new QueryClient();

  const renderHomePage = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContactsContextProvider>
          <Home />
        </ContactsContextProvider>
      </QueryClientProvider>,
    );
  };

  it("renders home page with all of the data in the contacts table, and navigates to the form page on clicking the table entry button", async () => {
    renderHomePage();

    const user = userEvent.setup();

    expect(await screen.findByText("Contacts"));

    const tableEntryButton = await screen.findByText("Add Table Entry");

    expect(tableEntryButton).toBeInTheDocument();

    expect(await screen.findByText("Contacts")).toBeInTheDocument();

    expect(await screen.findByText("Carroll PLC")).toBeInTheDocument();

    for (const header of tableHeaders) {
      expect(screen.getByText(header)).toBeInTheDocument();
    }

    for (const cell of firstRow) {
      expect(screen.getByText(cell)).toBeInTheDocument();
    }

    await user.click(tableEntryButton);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/contacts/new"));
  });

  it("renders the home page with the mocked bitcoin price and volatility charts", async () => {
    renderHomePage();

    expect(await screen.findByText("Bitcoin Price and Volatility Charts"));

    expect(await screen.findAllByTestId("mock-apexchart")).toHaveLength(2);
  });
});
