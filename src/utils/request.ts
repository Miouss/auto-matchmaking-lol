import fetch from "node-fetch";

import { league } from "../config";

export async function request(
  endpoint: string,
  method: string = "GET",
  body?: any
) {
  const url = `${league.host}${endpoint}`;
  const headers = {
    Authorization: league.auth,
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  let status = 404;
  let dataSend: unknown = "";

  try {
    status = response.status;
    const hasContent = response.headers.get("content-length") !== "0";

    if (hasContent) {
      const data = await response.json();

      dataSend = data;
    }
  } catch (err) {
    dataSend = "Impossible to parse response";
  } finally {
    return {
      ok: response.ok,
      status,
      data: dataSend,
    };
  }
}
