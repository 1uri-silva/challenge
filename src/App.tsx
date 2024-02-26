import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { DialogComponent } from "./components/dialog";

export function App() {
	const [challengeSelected, setChallenge] = useState("");
	const [toggleDialog, setToggleDialog] = useState(false);

	const { data: challenges } = useQuery({
		queryKey: ["challenges", challengeSelected],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:3000/challenges?challenge=${challengeSelected ?? ""}`,
			);

			const data = await response.json();

			return data;
		},

		placeholderData: keepPreviousData,
	});

	if (!challenges) {
		return null;
	}

	return (
		<div className="py-7 px-5 space-y-8">
			<header className="max-w-[1200px] mx-auto flex items-center justify-between border-b">
				<div className="flex flex-col items-center gap-3 p-1.5">
					<img
						src="https://i.pravatar.cc/300"
						alt="avatar"
						className="w-12 h-12 rounded-full"
					/>
					<span className="font-bold text-center text-lg">challenge</span>
				</div>

				<button
					type="button"
					onClick={() => setToggleDialog((previews) => !previews)}
					className="rounded text-center bg-blue-600 p-2"
				>
					New Challenge
				</button>
			</header>

			<main className="grid grid-cols-5 divide-x divide-solid gap-y-3">
				{toggleDialog && <DialogComponent setToggle={setToggleDialog}/>}
				{challenges?.map((challenge, i) => (
					<button
						type="button"
						onClick={() => setChallenge(challenge.challenge)}
						key={challenge.challenge + i}
						className="bg-slate-400/25 w-40 h-32 p-3 flex flex-col items-center gap-y-1 rounded"
					>
						<h3 className="text-white font-bold">{challenge.challenge}</h3>
						<div className="w-full h-[0.100rem] bg-white" />

						<div className="mt-2 flex flex-col gap-y-2">
							<span className="text-center text-white text-sm block">
								{challenge.challengers} challengers
							</span>
							<span className="text-center text-white text-sm block">
								{challenge.stars} stars
							</span>
						</div>
					</button>
				))}
			</main>
		</div>
	);
}
