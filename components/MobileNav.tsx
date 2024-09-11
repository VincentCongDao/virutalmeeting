"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sidebarLinks } from "./Sidebar";

const MobileNav = () => {
    /*
    The client side naivgation is default by this mean, the entire page does not reload when you click on a link. 
    Which it will needs useState to reset the state of the sidebar when you click on a link.
    Why? Because the background will not change when you click on a link. It just follows
    */
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState(pathname);

    useEffect(() => {
        // Our components will be rendered on the server and the client side navigation will not work.
        setCurrentPath(pathname);
    }, [pathname]);
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>

                <SheetTrigger asChild>
                    <div>
                        <AlignJustify size={36} className="cursor-pointer sm:hidden" />
                    </div>
                </SheetTrigger>
                <SheetContent className="border-none bg-dark-1">
                    <Link href="/" className="flex items-center gap-1">
                        <Image src="/icons/VirtualMeeting_logo.svg" alt="Virutal Meeting Logo" width={32} height={32} />
                        <p className="pl-2 text-[20px] text-white  font-extrabold">VirtualMeeting</p>
                    </Link>
                    <div className="flex flex-col h-[calc(100vh - 72px)] justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((link) => {
                                    /*
                                    (link.route === "/" && currentPath === "/") - Checking if you're at the main entrance
                                    (link.route !== "/" && currentPath.startsWith(link.route)) - Checking all other sections
                                    */
                                    const isActive =
                                        (link.route === "/" && currentPath === "/") ||
                                        (link.route !== "/" && currentPath.startsWith(link.route));
                                    return (
                                        <SheetClose asChild key={link.label}>

                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn(`flex gap-4 items-center p-4 rounded-lg justify-start`, { "bg-pink-1 text-gray-900/80": isActive })}
                                            >
                                                <link.iconName size={18} />
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section >
    );
}

export default MobileNav;