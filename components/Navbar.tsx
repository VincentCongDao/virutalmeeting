import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
    return (
        <nav className="flex z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 justify-between items-center">
            <Link href="/" className="flex items-center gap-1">
                <Image src="/icons/VirtualMeeting_logo.svg" alt="Virutal Meeting Logo" width={32} height={32} />
                <p className="text-[26px] text-white max-sm:hidden font-extrabold">VirtualMeeting</p>
            </Link>
            <div className="flex justify-between items-center gap-5 ">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <MobileNav />
            </div>
        </nav>
    );
}

export default Navbar;