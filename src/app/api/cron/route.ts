import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY ?? "");

const query = /* GraphQL */ `
  query MyQuery($users: [Identity!], $limit: Int) {
    Socials(
      input: {
        filter: { dappName: { _eq: farcaster }, identity: { _in: $users } }
        blockchain: ethereum
        limit: $limit
      }
    ) {
      Social {
        fnames
        userId
        profileName
        userAddress
        userAssociatedAddresses
        followerCount
        followingCount
        profileImage
      }
    }
  }
`;

export async function GET() {
  let res: any[] = [];
  const limit = 200; // pagination limit max 200
  // Replace with list of all user's 0x addresses
  const allUsers: string[] = [
    "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
    // Other 0x addresses
  ];
  for (let i = 0; i <= Math.floor(allUsers?.length / limit); i++) {
    const { data, error } = await fetchQuery(query, {
      users: allUsers?.slice(i * limit, (i + 1) * limit),
      limit,
    });
    if (error) Response.json({ error }, { status: 400 });
    res = [...res, ...(data?.Socials?.Social ?? [])];
  }

  return Response.json({ data: res });
}
