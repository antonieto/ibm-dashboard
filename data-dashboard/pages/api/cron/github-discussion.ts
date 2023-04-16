import { NextApiRequest, NextApiResponse } from 'next';

const GH_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const GH_REPOSITORY_ID = 'R_kgDOI-3SEw';

const GENERAL_DISCUSSION_CATEGORY_ID = 'DIC_kwDOI-3SE84CU2qi';

const GH_STANDUP_BODY = `
Share your daily standup update with the team here. Respond to this
discussion before the standup starts in the following format:


\`\`\`
**What did you achieve in the last 24 hours?**:
 - 

**What are your priorities for the next 24 hours?**:
 - 

**Blockers**:
 -

**Shoutouts**:
 - @username for x
\`\`\`

`;

const buildQuery = (repositoryId: string, title: string, body: string) => `
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

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append(
    'Authorization',
    `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const graphqlQuery = JSON.stringify({
    query: buildQuery(
      GH_REPOSITORY_ID,
      `Daily Standup - ${today}`,
      GH_STANDUP_BODY,
    ),
    variables: {},
  });

  const response = await fetch(GH_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: graphqlQuery,
  });

  const data = await response.json();
  return res.status(200).json(data);
}
