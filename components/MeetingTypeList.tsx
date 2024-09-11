"use client"

import { PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {
    const router = useRouter()
    const [homeRoomInt, setHomeRoomInt] = useState<"isScheduleMeeting" | "isInstantMeeting" | "isJoinMeeting" | undefined>();
    return (
        <section className="grid grids-cols-1 gap-5 md:grdi-cols-2 xl:grid-cols-4">
            <HomeCard title="New Meeting" description="Start an instant meeting" logo={<PackagePlus />} homeCardColors="bg-green-1" handleClick={() => setHomeRoomInt("isInstantMeeting")} />
            <HomeCard title="Scheduled Meeting" description="Plan your meetings" logo={<PackagePlus />} homeCardColors="bg-red-2" handleClick={() => setHomeRoomInt("isScheduleMeeting")} />
            <HomeCard title="View Records" description="Check your records" logo={<PackagePlus />} homeCardColors="bg-blue-2" handleClick={() => router.push("/recordings")} />
            <HomeCard title="Join Meetings" description="join with your code" logo={<PackagePlus />} homeCardColors="bg-red-1" handleClick={() => router.push("/isJoinMeeting")} />
        </section>
    );
}

export default MeetingTypeList;