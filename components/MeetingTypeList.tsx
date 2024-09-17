"use client"

import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from 'react-datepicker';
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Textarea } from "./ui/textarea";

/**
 * A functional component that renders a list of meeting types and allows users to create new meetings.
 *
 * @return {JSX.Element} The JSX element representing the meeting type list.
 */
const MeetingTypeList = () => {
    /**
     * homeRoomInt is a state variable that stores the current meeting type.
     * values stores details about the meeting: date and time, description and link
     * callDetails stores details about the created meeting
     */
    const [homeRoomInt, setHomeRoomInt] = useState<"isScheduleMeeting" | "isInstantMeeting" | "isJoinMeeting" | undefined>();
    const [callDetails, setCallDetails] = useState<Call>();
    const [values, setValues] = useState(
        {
            dateTime: new Date(),
            description: "",
            link: "",
        }
    );
    /**
     * toast is display notfication for success or error messages (useToast)
     *  useRouter provide the nagivation after click
     * useStreamVideoClient is used for creating meeting
    */
    const router = useRouter()
    const { toast } = useToast()
    const { user } = useUser()
    const client = useStreamVideoClient()
    /**
 * Creates a new meeting using the provided client and user.
 * 
 * @return {Promise<void>} A promise that resolves when the meeting is created successfully.
 */
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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className="grid grids-cols-1 gap-5 md:grdi-cols-2 xl:grid-cols-4">
            <HomeCard title="New Meeting" description="Start an instant meeting" logo={<PackagePlus />} homeCardColors="bg-green-1" handleClick={() => setHomeRoomInt("isInstantMeeting")} />
            <HomeCard title="Scheduled Meeting" description="Plan your meetings" logo={<PackagePlus />} homeCardColors="bg-red-2" handleClick={() => setHomeRoomInt("isScheduleMeeting")} />
            <HomeCard title="View Records" description="Check your records" logo={<PackagePlus />} homeCardColors="bg-blue-2" handleClick={() => router.push("/recordings")} />
            <HomeCard title="Join Meetings" description="join with your code" logo={<PackagePlus />} homeCardColors="bg-red-1" handleClick={() => router.push("/isJoinMeeting")} />
            {!callDetails ? (
                <MeetingModal
                    isOpen={homeRoomInt === "isScheduleMeeting"}
                    onClose={() => setHomeRoomInt(undefined)}
                    title="Create a scheduled meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={e => {
                                setValues({ ...values, description: e.target.value })
                            }} />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-2">
                            Select Date and time
                        </label>
                        <ReactDatePicker selected={values.dateTime}
                            onChange={date => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat={"MMMM d, yyyy h:mm aa"}
                            className="w-full rounded bg-dark-1 p-2 focus:outline-none" />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={homeRoomInt === "isScheduleMeeting"}
                    onClose={() => setHomeRoomInt(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: "Link copied" })
                    }

                    }
                />)
            }
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