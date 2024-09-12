import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";


interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    buttonText?: string;
    handleClick?: () => void;
    image?: string;
    buttonIcon?: string;
    children?: React.ReactNode;
}
const MeetingModal = ({ isOpen, onClose, title, className, buttonText, handleClick, image, buttonIcon }: MeetingModalProps) => {
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                    <div className="flex flex-col gap-6">
                        {
                            image &&
                            (
                                <div>
                                    <Image src={image} alt={image} width={72} height={72} />
                                </div>
                            )
                        }
                        <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
                        <Button className={`bg-pink-1 text-black focus-visible:ring-0 focus-visible:ring-offset-0`} onClick={handleClick}>
                            {buttonIcon &&
                                (
                                    <Image src={buttonIcon} alt={buttonIcon} width={24} height={24} />
                                )}
                            {buttonText || "Schedule Meeting"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default MeetingModal;