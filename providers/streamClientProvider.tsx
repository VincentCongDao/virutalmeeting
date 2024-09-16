"use client"
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;


// const client = new StreamVideoClient({ apiKey });
// const call = client.call('default', 'my-first-call');
// call.join({ create: true });

export const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>();
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error('Stream API key not found');

        const client = new StreamVideoClient({
            apiKey, user: { id: user?.id, name: user?.username || user?.id, image: user?.imageUrl },
            tokenProvider,
        });
        setVideoClient(client)
    }, [user, isLoaded]);

    if (!videoClient) return <Loader />
    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};