import Listen from "@/components/Listen/Listen";

const page = async ({ params }) => {
  return (
    <div>
      <Listen pathname={params.name} />
    </div>
  );
};

export default page;
