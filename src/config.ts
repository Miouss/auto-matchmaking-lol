const leaguePort = 49994;
const leagueHost = `https://127.0.0.1:${leaguePort}`;

const leagueToken = "ANs85ogqXWTUELp6VjGcrg";
const leagueAuth = `Basic ${Buffer.from(`riot:${leagueToken}`).toString("base64")}`;

export const league = {
    host: leagueHost,
    auth: leagueAuth,
}