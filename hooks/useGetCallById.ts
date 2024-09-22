"use client";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
/**
 * Retrieves a call by its ID.
 *
 * @param {string | string[]} id - The ID of the call to retrieve.
 * @return {{ call: Call, isCallLoading: boolean }} An object containing the retrieved call and a boolean indicating whether the call is still loading.
 */
export const useGetCallById = (id: string | string[]) => {
	const [call, setCall] = useState<Call>();
	const [isCallLoading, setIsCallLoading] = useState(true);

	const client = useStreamVideoClient();

	useEffect(() => {
		if (!client) return;

		const loadCall = async () => {
			const { calls } = await client.queryCalls({
				filter_conditions: {
					id,
				},
			});
			if (calls.length > 0) {
				setCall(calls[0]);
			}
			setIsCallLoading(false);
		};
		loadCall();
	}, [client, id]);
	return { call, isCallLoading };
};
