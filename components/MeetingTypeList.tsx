"use client"

import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { CalendarCheck2, Merge, PackagePlus, TableProperties } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from 'react-datepicker';
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { Input } from "./ui/input";
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

            <HomeCard title="Scheduled Meeting" description="Plan your meetings" logo={<CalendarCheck2 />}
                homeCardColors="bg-red-2" handleClick={() => setHomeRoomInt("isScheduleMeeting")} />

            <HomeCard title="View Records" description="Check your records" logo={<TableProperties />} homeCardColors="bg-blue-2" handleClick={() => router.push("/recordings")} />

            <HomeCard title="Join Meetings" description="join with your code" logo={<Merge />} homeCardColors="bg-red-1" handleClick={() => router.push("/isJoinMeeting")} />
            {!callDetails ? (
                <MeetingModal
                    isOpen={homeRoomInt === 'isScheduleMeeting'}
                    onClose={() => setHomeRoomInt(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Add a description
                        </label>
                        <Textarea
                            className="border-none bg-dark-2 focus-visible:ring-2 focus-visible:ring-offset-2"
                            onChange={(e) =>
                                setValues({ ...values, description: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-2 p-2 focus:ring-2"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={homeRoomInt === 'isScheduleMeeting'}
                    onClose={() => setHomeRoomInt(undefined)}
                    title="Meeting Created"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link Copied' });
                    }}
                    buttonIcon="/icons/copy.svg"
                    className="flex justify-center items-center "
                    buttonText="Copy Meeting Link"
                />
            )
            }
            <MeetingModal
                isOpen={homeRoomInt === "isInstantMeeting"}
                onClose={() => setHomeRoomInt(undefined)}
                title="Start an instant meeting"
                className="test-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={homeRoomInt === "isJoinMeeting"}
                onClose={() => setHomeRoomInt(undefined)}
                title="Insert the links"
                className="test-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input placeholder="Enter meeting link" className="border-none bg-dark-2 focus-visible:ring-2 focus-visible:ring-offset-2" onChange={(e) => setValues({ ...values, link: e.target.value })} />
            </MeetingModal>
        </section>
    );
}

export default MeetingTypeList;