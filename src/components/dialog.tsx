import { X, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
	setToggle(value: boolean): void;
};

export function DialogComponent({ setToggle }: Props) {
	const queryClient = useQueryClient();

	const [challenge, setChallenge] = useState("");

	const { mutateAsync } = useMutation({
		mutationFn: async (challengeParams: string) => {
			await fetch("http://localhost:3000/challenges", {
				method: "POST",
				body: JSON.stringify({
					challenge: challengeParams,
					challengers: 23,
					stars: 5,
				}),
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["challenges"],
			});
		},
	});
	
	return (
		<div className="fixed inset-0 bg-black/90">
			<div className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900">
				<strong className="text-center text-lg font-bold">
					Nova Challenge
				</strong>
				<div className="flex flex-col space-y-6">
					<label htmlFor="challenge">
						Challenge
						<input
							type="text"
							onChange={(e) => setChallenge(e.target.value)}
							id="challenge"
							className="rounded bg-transparent border w-full h-10"
						/>
					</label>
					<div className="flex flex-row justify-between">
						<button
							type="button"
							onClick={() => setToggle(false)}
							className="bg-red-700 h-10 w-20 rounded-md flex items-center justify-center"
						>
							<X className="size-6 font-extrabold" fontWeight="bold" />
						</button>

						<button
							type="button"
							onClick={() => {
								setToggle(false);
								mutateAsync(challenge);
							}}
							className="bg-green-700 h-10 w-20 rounded-md	flex items-center justify-center"
						>
							<Plus
								size={15}
								className="size-6 font-extrabold"
								fontWeight="bold"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
