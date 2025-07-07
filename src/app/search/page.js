import Search from "@/components/Search/Search";

const page = async ({searchParams}) => {
    return (
        <div>
            <Search searchParams={searchParams} />
        </div>
    );
};

export default page;