import ShowUserCards from "@/components/ShowUserCards";
import UserCard from "@/components/UserCard";
import useFetchUsers from "@/hooks/useFetchUsers";

export default async function Page({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;
  

  return (
    <div>
      <ShowUserCards search={search} />
    </div>
  );
}
