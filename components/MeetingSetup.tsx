"use client"
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
/**
 * A component for setting up a meeting, including toggling mic and camera, and joining the call.
 *
 * @param {function} setIsSetupComple - A callback function to set the meeting setup completion status.
 * @return {JSX.Element} The meeting setup component.
 * setIsSetupComple is from Meeting page
 * It use useState to store the state of mic and camera
 * useCall hook from @stream-io/video-react-sdk is used to get the current call object such as id
 * 
 */
const MeetingSetup = ({ setIsSetupComple }: { setIsSetupComple: (value: boolean) => void }) => {
    const [isMicCamToggle, setIsMicCamToggle] = useState(false);
    const call = useCall()

    if (!call) {
        throw new Error("Call not found")
    }
    useEffect(() => {
        if (isMicCamToggle) {
            call?.camera.disable()
            call?.microphone.disable()
        }
        else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    }, [isMicCamToggle, call?.camera, call?.microphone]);
    return (
        <div className="flex h-screen w-full flex flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-3xl font-bold">
                <VideoPreview />
                <div className="flex h-16 items-center justify-center gap-3">
                    <label className="flex items-center justify-center gap-2 font-medium">
                        <input type="checkbox"
                            checked={isMicCamToggle}
                            onChange={(e) => setIsMicCamToggle(e.target.checked)} />
                        Join with mic and camera off
                    </label>
                    <DeviceSettings />
                </div>
                <Button className="rounded-md bg-blue-700 text-lg text-semibold px-4 py-2.5" onClick={() => {
                    call.join()
                    setIsSetupComple(true)
                }} >
                    Join The Room
                </Button>
            </h1>

        </div >
    );
}

export default MeetingSetup;