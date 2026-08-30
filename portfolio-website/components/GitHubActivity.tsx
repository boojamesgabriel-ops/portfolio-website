"use client";

import { useEffect, useState } from "react";

type ActivityDay = {
  date: string;
  contributionCount: number;
};

type ActivityResponse = {
  status: string;
  username: string | null;
  totalContributions: number;
  days: ActivityDay[];
};

const EMPTY_DAYS = Array.from({ length: 70 }, (_, index) => ({
  date: `empty-${index}`,
  contributionCount: 0,
}));

function getOpacity(count: number, maximum: number) {
  if (count === 0) {
    return 0.1;
  }

  return 0.2 + (count / maximum) * 0.8;
}

export default function GitHubActivity() {
  const [activity, setActivity] = useState<ActivityResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function loadActivity() {
      try {
        const response = await fetch("/api/github-activity");
        const data = (await response.json()) as ActivityResponse;

        if (active) {
          setActivity(data);
        }
      } catch {
        if (active) {
          setActivity({
            status: "DATA UNAVAILABLE",
            username: null,
            totalContributions: 0,
            days: [],
          });
        }
      }
    }

    void loadActivity();

    return () => {
      active = false;
    };
  }, []);

  const days = activity?.days.length ? activity.days : EMPTY_DAYS;
  const maximum = Math.max(...days.map((day) => day.contributionCount), 1);
  const status = activity?.status ?? "LOADING DATA";
  const label = activity?.username
    ? `${activity.username}'s GitHub activity over the last year`
    : "GitHub activity is loading";

  return (
    <>
      <div className="about-strip-heading">
        <span id="github-activity-title">GITHUB ACTIVITY</span>
        <span>{status}</span>
      </div>

      <div
        className="github-contribution-grid"
        role="img"
        aria-label={label}
      >
        {days.map((day) => (
          <span
            key={day.date}
            title={
              day.date.startsWith("empty-")
                ? "GitHub activity"
                : `${day.contributionCount} contributions on ${day.date}`
            }
            style={{ opacity: getOpacity(day.contributionCount, maximum) }}
          />
        ))}
      </div>

      {activity?.username && (
        <span className="github-contribution-total">
          {activity.totalContributions} CONTRIBUTIONS / LAST YEAR
        </span>
      )}
    </>
  );
}
