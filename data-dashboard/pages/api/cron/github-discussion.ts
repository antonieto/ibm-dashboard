import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const GH_REPOSITORY_ID = "R_kgDOI-3SEw";
const GENERAL_DISCUSSION_CATEGORY_ID = "DIC_kwDOI-3SE84CU2qi";

const buildQuery = (repositoryId: string, title: string, body: string) => {
  return `
	mutation CreateDiscussion {
    createDiscussion(
        input: {
                repositoryId: "${repositoryId}",
                title: "${title}",
                body: "${body}",
                categoryId: "${GENERAL_DISCUSSION_CATEGORY_ID}",
            }
    ) {
        clientMutationId
    }
}`;
};

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const body = await fs.readFile(
    process.cwd() + "/pages/api/cron/standupDiscussionTemplate.txt",
    "utf-8"
  );

  const graphqlQuery = JSON.stringify({
    query: buildQuery(GH_REPOSITORY_ID, `Daily Standup - ${today}`, body),
    variables: {},
  });

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: graphqlQuery,
  });

  const data = await response.json();
  return res.status(200).json(data);
}
