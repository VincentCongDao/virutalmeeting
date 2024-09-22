"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
const Table = ({ title, description }: { title: string, description: string }) => {
    return (
        <div className="flex flex-col items-start gap-2 xl:flex-row">
            <h1 className="text-base font-medium text-sky-100 lg:text-xl xl:min-w-32">{title}</h1>
            <h2 className="truncate text-sm font-semibold text-sky-100 max-sm:max-w-[320px] lg:text-lg">{description}</h2>
        </div>
    )
}

const PersonalMeetings = () => {
    const { toast } = useToast();
    const { user } = useUser();
    const meetingId = user?.id
    const client = useStreamVideoClient()
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
    const { call } = useGetCallById(meetingId!)
    const router = useRouter()
    const startRoom = async () => {
        // If there are no user or client, then simple exit the application
        if (!client || !user) return;
        // If there are no call
        if (!call) {
            const newCall = client.call("default", meetingId!)
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                }
            })
        }


        router.push(`/meeting/${meetingId}?personal=true`)
    }
    return (
        <section className="flex size-full  flex-col gap-10 text-white">
            <h1 className="text-3xl font-bold">
                Person Meeting
            </h1>
            <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
                <Table title="Topic" description={`${user?.username}'s metting room`} />
                <Table title="Meeting ID" description={meetingId!} />
                <Table title="Invite Link" description={meetingLink} />
            </div>
            <div className="flex gap-5">
                <Button className="bg-sky-300" onClick={startRoom}>
                    Sstart Meeting
                </Button>
                <Button className="bg-sky-950" onClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({
                        title: "Link Copied",
                    });
                }}>
                    Copy Invitation
                </Button>
            </div>
        </section>
    );
}

export default PersonalMeetings;