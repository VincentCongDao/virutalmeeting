import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Virutal Meeting",
    description: "A place where you can able to video chat with your friends, stranger, and etc.",
    icons: {
        icon: "/icons/VirtualMeeting_logo.svg",
    }
};
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="relative">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomeLayout;