import fetch from "node-fetch";

import { league } from "../../config";

export async function performRequest(
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
    const data = await response.json();
    status = response.status;

    if (response.ok) {
      dataSend = data;
    } else {
      throw new Error();
    }
  } catch (err) {
    dataSend = "Impossible to parse response";
  } finally {
    return {
      status,
      data: dataSend,
    };
  }
}
