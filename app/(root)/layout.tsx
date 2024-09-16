import { StreamClientProvider } from "@/providers/streamClientProvider";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            <StreamClientProvider>{children}</StreamClientProvider>
        </main >
    );
}

export default RootLayout;