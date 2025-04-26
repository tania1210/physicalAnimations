import {
	create,
} from 'zustand'

interface ICounterState {
	counter: number;
	updateCounter: (offset: number) => () => void;
	resetCounter: () => void
}

export const useCounter = create<ICounterState>((set,) => {
	return {
		counter:       0,
		updateCounter: (offset: number,) => {
			return (): void => {
				set((state,) => {
					return {
						counter: state.counter + offset,
					}
				},)
			}
		},
		resetCounter: (): void => {
			set({
				counter: 0,
			},)
		},
	}
},)