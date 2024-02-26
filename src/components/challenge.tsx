interface Challenge {
	challenge: string
	challengers: number
	stars: number
	id: string
}

type Props = {
	challenge: Challenge;
	selectChallenge(challenge: string): void
}

export function Challenge({ challenge, selectChallenge }: Props) {
	return (
		<button
			type="button"
			onClick={() => selectChallenge(challenge.challenge)}
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
	)
}