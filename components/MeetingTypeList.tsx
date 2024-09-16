"use client"

import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
    const router = useRouter()
    const [homeRoomInt, setHomeRoomInt] = useState<"isScheduleMeeting" | "isInstantMeeting" | "isJoinMeeting" | undefined>();
    const [values, setValues] = useState(
        {
            dateTime: new Date(),
            description: "",
            link: "",
        }
    );
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({ title: "Please select date and time" })
                return
            }
            const callId = crypto.randomUUID();
            const call = client.call('default', callId);
            if (!call) throw new Error("Failed to create call");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            call.join({ create: true });
            toast({ title: "Meeting created successfully" })
        }
        catch (error) {
            console.log(error)
            toast({
                title: "Failed to create meeting",
            })
        }
    }
    return (
        <section className="grid grids-cols-1 gap-5 md:grdi-cols-2 xl:grid-cols-4">
            <HomeCard title="New Meeting" description="Start an instant meeting" logo={<PackagePlus />} homeCardColors="bg-green-1" handleClick={() => setHomeRoomInt("isInstantMeeting")} />
            <HomeCard title="Scheduled Meeting" description="Plan your meetings" logo={<PackagePlus />} homeCardColors="bg-red-2" handleClick={() => setHomeRoomInt("isScheduleMeeting")} />
            <HomeCard title="View Records" description="Check your records" logo={<PackagePlus />} homeCardColors="bg-blue-2" handleClick={() => router.push("/recordings")} />
            <HomeCard title="Join Meetings" description="join with your code" logo={<PackagePlus />} homeCardColors="bg-red-1" handleClick={() => router.push("/isJoinMeeting")} />

            <MeetingModal
                isOpen={homeRoomInt === "isInstantMeeting"}
                onClose={() => setHomeRoomInt(undefined)}
                title="Start an instant meeting"
                className="test-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    );
}

export default MeetingTypeList;