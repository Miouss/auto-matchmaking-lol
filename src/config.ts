import { exec } from "child_process";

const command = "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline";

interface LeagueInfo {
    host: string;
    auth: string;
}

async function getLeagueInfo(): Promise<LeagueInfo> {
  return new Promise((resolve) => {
    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Command returned an error: ${stderr}`);
        return;
      }

      const leaguePort = getLeaguePort(stdout);
      const leagueHost = `https://127.0.0.1:${leaguePort}`;

      const leagueToken = getLeagueToken(stdout);
      const leagueAuth = `Basic ${Buffer.from(`riot:${leagueToken}`).toString(
        "base64"
      )}`;

      resolve({ host: leagueHost, auth: leagueAuth });
    });
  });
}

export const league = await getLeagueInfo();

function getLeaguePort(stdout: string) {
  const regexAppPort = /--app-port=(\d+)/;

  const leaguePortMatch = stdout.match(regexAppPort);

  const leaguePort = leaguePortMatch ? leaguePortMatch[1] : null;

  return leaguePort;
}

function getLeagueToken(stdout: string) {
  const regexRemotingAuthToken = /--remoting-auth-token=([\w-]+)/;

  const leagueRemotingAuthTokenMatch = stdout.match(regexRemotingAuthToken);

  const leagueRemotingAuthToken = leagueRemotingAuthTokenMatch
    ? leagueRemotingAuthTokenMatch[1]
    : null;

  return leagueRemotingAuthToken;
}
