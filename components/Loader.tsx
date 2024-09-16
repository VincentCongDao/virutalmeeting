import Image from "next/image";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Image src="/images/interview.gif" alt="Loading" width={200} height={200} />
        </div>
    );
}

export default Loader;