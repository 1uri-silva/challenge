import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { DialogComponent } from "./components/dialog";
import { Header } from "./components/header";
import { Challenge } from "./components/challenge";

type ChallengeResponse = {
	challenge: string
	challengers: number
	stars: number
	id: string
}

export function App() {
	const [urlParams, setUrlParams] = useSearchParams();

	const [challengeSelected, setChallenge] = useState("");

	const { data: challenges } = useQuery<ChallengeResponse[]>({
		queryKey: ["challenges", challengeSelected],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:3000/challenges?challenge=${challengeSelected ?? ""}`,
			);

			if (challengeSelected) {
				selectChallenge(challengeSelected)
			}

			const data = await response.json();

			return data;
		},

		placeholderData: keepPreviousData,
	});

	function selectChallenge(challengeSelectedParams: string) {
		setUrlParams((prev) => {
			prev.set('_challenge', challengeSelectedParams)

			return prev
		})
	}

	if (!challenges) {
		return null;
	}

	return (
		<div className="py-7 px-5 space-y-8">
			<Header />

			<main className="grid grid-cols-5 divide-x divide-solid gap-y-3">
				{urlParams.get('_dialog') === 'true' && <DialogComponent />}
				{challenges?.map((challenge, i) =>
					<Challenge key={challenge.id + i} selectChallenge={setChallenge} challenge={challenge} />
				)}
			</main>
		</div>
	);
}
