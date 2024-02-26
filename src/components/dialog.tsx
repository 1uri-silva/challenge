import { z } from 'zod'
import { X, Plus } from "lucide-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function DialogComponent() {
	const queryClient = useQueryClient();
	const [_, setUrlToggleParams] = useSearchParams();

	const challengeSchema = z.object({
		challenge: z.string().min(5)
	})

	type Challenge = z.infer<typeof challengeSchema>

	const { register, handleSubmit, formState } = useForm<Challenge>({
		resolver: zodResolver(challengeSchema)
	})

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async ({ challenge }: Challenge) => {
			await new Promise(resolve => setTimeout(resolve, 2000))

			await fetch("http://localhost:3000/challenges", {
				method: "POST",
				body: JSON.stringify({
					challenge,
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

	async function newChallenge({ challenge }: Challenge) {
		await mutateAsync({ challenge })
		toggleDialog()
	}

	function toggleDialog() {
		setUrlToggleParams((prev) => {
			switch (prev.get('_dialog')) {
				case '':
					prev.set('_dialog', 'true')
					return prev;
				case 'true':
					prev.set('_dialog', 'false')
					return prev;
				case 'false':
					prev.set('_dialog', 'true')
					return prev;

				default:

					return prev;
			}
		})
	}

	return (
		<div className="fixed inset-0 bg-black/90">
			<div className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900">
				<strong className="text-center text-lg font-bold">
					Nova Challenge
				</strong>
				<form onSubmit={handleSubmit(newChallenge)} className="flex flex-col space-y-6">
					<label htmlFor="challenge">
						Challenge
						<input
							{...register('challenge')}
							type="text"
							id="challenge"

							className="rounded bg-transparent border w-full h-10"
						/>

						{formState.errors?.challenge && (
							<p className="text-sm text-red-400">{formState.errors.challenge.message}</p>
						)}
					</label>
					<div className="flex flex-row justify-between">
						<button
							type="button"
							onClick={toggleDialog}
							className="bg-red-700 h-10 w-20 rounded-md flex items-center justify-center"
						>
							<X className="size-6 font-extrabold" fontWeight="bold" />
						</button>

						<button
							type="submit"
							disabled={isPending}
							className="bg-green-700 h-10 w-20 rounded-md	flex items-center justify-center disabled:bg-slate-200/70"
						>
							<Plus
								size={15}
								className="size-6 font-extrabold"
								fontWeight="bold"
							/>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
