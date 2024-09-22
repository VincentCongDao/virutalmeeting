

interface HomeCardProps {
    logo: JSX.Element;
    title: string;
    description: string;
    homeCardColors: string;
    icon?: string
    handleClick?: () => void
}
const HomeCard: React.FC<HomeCardProps> = ({ logo, title, description, homeCardColors, handleClick }) => {
    return (
        <div>
            <div className={`${homeCardColors} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`} onClick={handleClick} >
                {logo && (
                    <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
                        {logo}
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-lg">{description}</p>
                </div>
            </div>
        </div >
    );
}

export default HomeCard;