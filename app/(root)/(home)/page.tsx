import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
    const d = new Date();

    const formatTime = d.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
    })
    const formatDate = d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: 'numeric',
        year: 'numeric',
    })
    return (
        <section className="flex size-full  flex-col gap-10 text-white">
            <div className="h-[300px] w-fulll rounded-[20px] bg-hero bg-cover">
                <div className="flex h-full  flex-col justify-between max=md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">Upcoming Meeting: 12:30 PM</h2>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold lg:text-7xl">{formatTime}</h1>
                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{formatDate}</p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    );
}

export default Home;