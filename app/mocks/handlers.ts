import { http, HttpResponse } from "msw";
import { BASE_BINANCE_URL, BASE_FAKER_URL } from "../api/api";
import {
  BINANCE_180_DAY_BTC_PRICES,
  BINANCE_30_DAY_BTC_PRICES,
  contactsList,
} from "app/test-utils";

export const handlers = [
  http.get(`${BASE_FAKER_URL}/custom`, ({ request }) => {
    return HttpResponse.json({
      data: contactsList,
    });
  }),
  http.get(`${BASE_BINANCE_URL}/api/v3/klines`, ({ request }) => {
    const url = new URL(request.url);

    const limit = url.searchParams.get("limit");

    if (limit === "30") {
      return HttpResponse.json(BINANCE_30_DAY_BTC_PRICES);
    }

    if (limit === "180") {
      return HttpResponse.json(BINANCE_180_DAY_BTC_PRICES);
    }

    return HttpResponse.json(null);
  }),
];
