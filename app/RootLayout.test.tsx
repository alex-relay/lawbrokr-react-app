import { render, screen, within } from "@testing-library/react";
import Layout from "./layout";

describe("Layout", () => {
  it("renders the nav bar with links and user info", async () => {
    render(<Layout>{null}</Layout>);

    const navBar = await screen.findByTestId("lawbrokr-navbar");

    expect(await screen.findByTestId("lawbrokr-logo"));
    expect(within(navBar).getByText("Landing Pages")).toBeInTheDocument();
    expect(within(navBar).getByText("Analytics")).toBeInTheDocument();
    expect(within(navBar).getByText("Funnel")).toBeInTheDocument();
    expect(within(navBar).getByText("Automations")).toBeInTheDocument();
    expect(within(navBar).getByText("Clips")).toBeInTheDocument();
    expect(within(navBar).getByText("Landing Pages")).toBeInTheDocument();
    expect(within(navBar).getByText("My Library")).toBeInTheDocument();
    expect(within(navBar).getByText("Settings")).toBeInTheDocument();
    expect(within(navBar).getByText("Home")).toBeInTheDocument();
    expect(within(navBar).getByText("Responses")).toBeInTheDocument();
  });
});
