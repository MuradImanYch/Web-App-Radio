import Listen from "@/components/Listen/Listen";

const page = async ({ params }) => {
  return (
    <div>
      <Listen pathname={params.name} lang={params.lang || 'en'} />
    </div>
  );
};

export default page;
