describe('vote', () => {

	it('создаёт результат голосования для выбранной записи', () => {
		const state = {
			pair: ['Trainspotting', '28 Days Later']
		};
		const nextState = vote(state, 'Trainspotting');
		expect(nextState).to.deep.equal({
			pair: ['Trainspotting', '28 Days Later'],
			tally: {
				'Trainspotting': 1
			}
		});
	});

	it('добавляет в уже имеющийся результат для выбранной записи', () => {
		const state = {
			pair: ['Trainspotting', '28 Days Later'],
			tally: {
				'Trainspotting': 3,
				'28 Days Later': 2
			}
		};
		const nextState = vote(state, 'Trainspotting');
		expect(nextState).to.deep.equal({
			pair: ['Trainspotting', '28 Days Later'],
			tally: {
				'Trainspotting': 4,
				'28 Days Later': 2
			}
		});
	});

});