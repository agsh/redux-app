import {setEntries, next, vote, INITIAL_STATE} from './core';
import * as Const from '../constants';

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Const.SET_ENTRIES:
			return setEntries(state, action.entries);
		case Const.NEXT:
			return next(state);
		case Const.VOTE:
			return vote(state, action.entry)
	}
	return state;
}