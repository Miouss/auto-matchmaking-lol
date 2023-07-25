const leaguePort = 59268;
const leagueHost = `https://127.0.0.1:${leaguePort}`;

const leagueToken = "mJJFJGnJrdXMyePN-q2VNg";
const leagueAuth = `Basic ${Buffer.from(`riot:${leagueToken}`).toString("base64")}`;

export const league = {
    host: leagueHost,
    auth: leagueAuth,
}