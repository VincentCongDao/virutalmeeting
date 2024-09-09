"use client";

import { cn } from '@/lib/utils';
import { ArrowLeftFromLine, BringToFront, CassetteTape, ClipboardPenLine, House } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();
    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
            <div className="flex flex-1 flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route || pathname.startsWith(link.route);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(`flex gap-4 items-center p-4 rounded-lg justify-start`, { "bg-blue-1": isActive })}
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