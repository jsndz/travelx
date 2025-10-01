import { auth } from "@clerk/nextjs";

export async function getAuthToken() {
  const token = (await auth().getToken({ template: "convex" })) ?? undefined;
  console.log(token);

  return token;
}
