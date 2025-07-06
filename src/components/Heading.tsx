import { Separator } from "./ui/separator";

interface IProps {
    heading: string,
    paragraph?: string
}

const Heading = ({heading, paragraph} : IProps) => {
    return (
        <div className="mb-8 md:mb-10 lg:mb-12 flex flex-col items-center max-w-sm mx-auto">
            <h2 className="font-bold text-3xl">{heading}</h2>
            {
                paragraph && <p className="text-gray-600 italic">{paragraph}</p>
            }
            <Separator className="mt-2" />
        </div>
    );
};

export default Heading;