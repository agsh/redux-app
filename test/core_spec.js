import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('добавляет записи к состоянию', () => {
			const state = {};
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.deep.equal({
				entries: ['Trainspotting', '28 Days Later']
			});
		});

	});

	describe('далее', () => {

		it('берёт для голосования следующие две записи', () => {
			const state = {
				entries: ['Trainspotting', '28 Days Later', 'Sunshine']
			};
			const nextState = next(state);
			expect(nextState).to.deep.equal({
				vote: {
					pair: ['Trainspotting', '28 Days Later']
				},
				entries: ['Sunshine']
			});
		});

	});


	describe('vote', () => {

		it('создаёт результат голосования для выбранной записи', () => {
			const state = {
				vote: {
					pair: ['Trainspotting', '28 Days Later']
				},
				entries: []
			};
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.deep.equal({
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 1
					}
				},
				entries: []
			});
		});

		it('добавляет в уже имеющийся результат для выбранной записи', () => {
			const state = {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 3,
						'28 Days Later': 2
					}
				},
				entries: []
			};
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.deep.equal({
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 4,
						'28 Days Later': 2
					}
				},
				entries: []
			});
		});
	});

	
	it('помещает победителя текущего голосования в конец списка записей', () => {
		const state = {
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {
					'Trainspotting': 4,
					'28 Days Later': 2
				}
			},
			entries: ['Sunshine', 'Millions', '127 Hours']
		};
		const nextState = next(state);
		expect(nextState).to.deep.equal({
			vote: {
				pair: ['Sunshine', 'Millions']
			},
			entries: ['127 Hours', 'Trainspotting']
		});
	});

	it('в случае ничьей помещает обе записи в конец списка', () => {
		const state = {
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {
					'Trainspotting': 3,
					'28 Days Later': 3
				}
			},
			entries: ['Sunshine', 'Millions', '127 Hours']
		};
		const nextState = next(state);
		expect(nextState).to.deep.equal({
			vote: {
				pair: ['Sunshine', 'Millions']
			},
			entries: ['127 Hours', 'Trainspotting', '28 Days Later']
		});
	});

	it('когда остаётся лишь одна запись, помечает её как победителя', () => {
		const state = {
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {
					'Trainspotting': 4,
					'28 Days Later': 2
				}
			},
			entries: []
		};
		const nextState = next(state);
		expect(nextState).to.deep.equal({
			winner: 'Trainspotting'
		});
	});

});

