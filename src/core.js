export const INITIAL_STATE = {};

export function setEntries(state, entries) {
	return {
		...state,
		entries: [].concat(state.entries || [], entries)
	}
}

function vote(voteState, entry) {
	return {
		voteState
	}
}

function getWinners(vote) {
	if (!vote) return [];
	const [a, b] = vote.pair;
	const aVotes = vote.tally[a];
	const bVotes = vote.tally[b];
	if      (aVotes > bVotes)  return [a];
	else if (aVotes < bVotes)  return [b];
	else                       return [a, b];
}

export function next(state) {
	const entries = [].concat(state.entries || [], getWinners(state.vote));
	if (entries.length === 1) {
		return {
			winner: entries[0]
		}
	}
	let others = entries.slice(2);
	let pair = entries.slice(0,2);
	console.log(pair);
	return {
		...state,
		vote: {pair},
		entries: others
	}
}

export function vote(state, entry) {
	return {
		...state,
		vote: {
			...state.vote,
			tally: {
				...state.vote.tally,
				[entry]: (state.vote && state.vote.tally && state.vote.tally[entry] ? state.vote.tally[entry] + 1 : 1)
			}
		}
	}
}

