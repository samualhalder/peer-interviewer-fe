import ShowUserCards from "@/components/ShowUserCards";
import { Metadata } from "next";

type PropType = {
  params: Promise<{ search: string }>;
};
export const generateMetadata = async ({
  params,
}: PropType): Promise<Metadata> => {
  const search = decodeURIComponent((await params).search);
  return {
    title: `results for ${search}`,
  };
};

export default async function Page({ params }: PropType) {
  const { search } = await params;

  return (
    <div>
      <ShowUserCards search={search} />
    </div>
  );
}
