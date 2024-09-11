"use client";

import { cn } from '@/lib/utils';
import { ArrowLeftFromLine, BringToFront, CassetteTape, ClipboardPenLine, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const sidebarLinks = [
    {
        iconName: House,
        route: "/",
        label: "Home",
    },
    {
        iconName: BringToFront,
        route: "/upcoming",
        label: "Upcoming",
    },
    {
        iconName: ArrowLeftFromLine,
        route: "/previous",
        label: "Previous",
    },
    {
        iconName: CassetteTape,
        route: "/recordings",
        label: "Recordings",
    },
    {
        iconName: ClipboardPenLine,
        route: "/personal-meetings",
        label: "Personal Meetings",
    },
];
const Sidebar = () => {

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
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    /*
                   (link.route === "/" && currentPath === "/") - Checking if you're at the main entrance
                   (link.route !== "/" && currentPath.startsWith(link.route)) - Checking all other sections
                
                   There is another way to do this:
                   (link.route !== "/" && currentPath.startsWith(`${link.route}/`));
                   */
                    const isActive =
                        (link.route === "/" && currentPath === "/") ||
                        (link.route !== "/" && currentPath.startsWith(link.route));
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(`flex gap-4 items-center p-4 rounded-lg justify-start`, { "bg-pink-1 text-gray-900/80": isActive })}
                        >
                            <link.iconName size={24} />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default Sidebar;