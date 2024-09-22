import Image from "next/image";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Image src="/images/interview.gif" alt="Loading" width={500} height={500} unoptimized />
        </div>
    );
}

export default Loader;