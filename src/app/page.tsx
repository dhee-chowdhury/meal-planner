import db from "@/lib/db";

export default async function Home() {
  const user = await db.user.findFirst();
  return <div>{JSON.stringify(user, null, 2)}</div>;
}
