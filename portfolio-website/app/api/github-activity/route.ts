type GitHubContributionDay = {
  date: string;
  contributionCount: number;
};

type GitHubResponse = {
  data?: {
    user?: {
      login: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: GitHubContributionDay[];
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const CONTRIBUTION_QUERY = `
  query Contributions($username: String!) {
    user(login: $username) {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const username = process.env.GITHUB_USERNAME?.trim();
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!username || !token) {
    return Response.json(
      {
        status: "CONFIG REQUIRED",
        username: username ?? null,
        totalContributions: 0,
        days: [],
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-website",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    const result = (await response.json()) as GitHubResponse;

    if (!response.ok || result.errors?.length || !result.data?.user) {
      throw new Error(result.errors?.[0]?.message ?? "GitHub user was not found");
    }

    const calendar = result.data.user.contributionsCollection.contributionCalendar;

    return Response.json({
      status: "LIVE DATA",
      username: result.data.user.login,
      totalContributions: calendar.totalContributions,
      days: calendar.weeks.flatMap((week) => week.contributionDays),
    });
  } catch (error) {
    console.error("GitHub activity failed to load:", error);

    return Response.json(
      {
        status: "DATA UNAVAILABLE",
        username,
        totalContributions: 0,
        days: [],
      },
      { status: 502 },
    );
  }
}
