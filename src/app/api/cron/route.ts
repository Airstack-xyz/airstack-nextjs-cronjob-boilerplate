import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY ?? "");

const query = /* GraphQL */ `
  query MyQuery {
    Socials(
      input: {
        filter: {
          dappName: { _eq: farcaster }
          profileName: { _eq: "dwr.eth" }
        }
        blockchain: ethereum
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
  const { data, error } = await fetchQuery(query);

  return Response.json({ data, error });
}
