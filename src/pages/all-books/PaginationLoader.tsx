import { Skeleton } from "@/components/ui/skeleton";

const PaginationLoader = () => {
    return (
       <Skeleton className="h-12 w-60 bg-gray-400 mx-auto">
       </Skeleton>
    );
};

export default PaginationLoader;