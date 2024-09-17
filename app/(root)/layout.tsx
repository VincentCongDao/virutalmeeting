import { StreamClientProvider } from "@/providers/streamClientProvider";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Virutal Meeting",
    description: "A place where you can able to video chat with your friends, stranger, and etc.",
    icons: {
        icon: "/icons/VirtualMeeting_logo.svg",
    }
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <StreamClientProvider>{children}</StreamClientProvider>
        </main >
    );
}

export default RootLayout;