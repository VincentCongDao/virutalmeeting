"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
	const [calls, setCalls] = useState<Call[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const client = useStreamVideoClient();
	const { user } = useUser();

	useEffect(() => {
		const loadCalls = async () => {
			if (!client || !user?.id) return;

			setIsLoading(true);

			try {
				const { calls } = await client.queryCalls({
					// filter the calls by when it started
					sort: [
						{
							field: "starts_at",
							direction: -1,
						},
					],
					filter_conditions: {
						starts_at: { $exists: true },
						$or: [{ creator_by_user_id: user?.id }, { members: { $id: [user.id] } }],
					},
				});
				setCalls(calls);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		loadCalls();
	}, [client, user?.id]);

	const nowDate = new Date();

	const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
		return (startsAt && new Date(startsAt) < nowDate) || !!endedAt;
	});

	const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
		return startsAt && new Date(startsAt) > nowDate;
	});

	return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
