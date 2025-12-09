import { useQuery } from "@tanstack/react-query";

const BASE_BINANCE_URL = "https://api.binance.com";
const BASE_FAKER_URL = "https://fakerapi.it/api/v2";

type KlineData = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string,
];

export type Contact = {
  company: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  employees: number;
  revenue: number;
  website: string;
  sales_rep: string;
  last_contacted: string;
  purchased: boolean;
  notes: string;
  id: number;
};

const getContactList = async (): Promise<Contact[]> => {
  const data = await fetch(
    `${BASE_FAKER_URL}/custom?_quantity=10&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text`,
  );

  if (!data.ok) {
    const resp = await data.json();
    throw new Error(
      resp.detail || resp.message || "Failed to fetch the Faker contact list",
    );
  }

  const contacts = await data.json();
  const contactsData: Contact[] = contacts.data ?? [];

  const contactsWithId = contactsData.map((contact: Contact, idx) => ({
    ...contact,
    id: idx + 1,
  }));

  return contactsWithId;
};

const useGetContactList = () => {
  return useQuery({
    queryKey: ["faker-contact-list"],
    queryFn: getContactList,
  });
};

const getBTCPriceWithInterval = async (
  interval = "1d",
  limit = "30",
  symbol = "BTCUSDT",
): Promise<KlineData[]> => {
  const data = await fetch(
    `${BASE_BINANCE_URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
    {
      method: "GET",
    },
  );

  if (!data.ok) {
    const resp = await data.json();
    throw new Error(
      resp.detail || resp.message || "Failed to fetch the BTC price data",
    );
  }

  return data.json();
};

const useGetBTCPriceWithInterval = (
  queryKeySuffix: string[] = ["btc-price-with-interval"],
  interval = "1d",
  limit = "30",
  symbol = "BTCUSDT",
) => {
  return useQuery({
    queryKey: ["btc-price-with-interval", ...queryKeySuffix],
    queryFn: () => getBTCPriceWithInterval(interval, limit, symbol),
  });
};

export { useGetBTCPriceWithInterval, useGetContactList, BASE_FAKER_URL, BASE_BINANCE_URL };
