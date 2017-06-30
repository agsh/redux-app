import {expect} from 'chai';

describe('immutability', () => {

	describe('A Number', () => {

		function increment(currentState) {
			return currentState + 1;
		}

		it('is immutable', () => {
			let state = 42;
			let nextState = increment(state);

			expect(nextState).to.equal(43);
			expect(state).to.equal(42);
		});

	});

	describe('A List', () => {

		function addMovie(currentState, movie) {
			return currentState.concat([movie]);
		}

		it('is immutable', () => {
			let state = ['Trainspotting', '28 Days Later'];
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.deep.equal([
				'Trainspotting',
				'28 Days Later',
				'Sunshine'
			]);
			expect(state).to.deep.equal([
				'Trainspotting',
				'28 Days Later'
			]);
		});

	});

	describe('A tree', () => {

		function addMovie(currentState, movie) {
			let newObj = Object.assign({}, currentState);
			newObj.movies = newObj.movies.concat([movie]);
			return newObj;
		}

		it('is immutable', () => {
			let state = {
				movies: ['Trainspotting', '28 Days Later']
			};
			let nextState = addMovie(state, 'Sunshine');

			expect(nextState).to.deep.equal({
				movies: [
					'Trainspotting',
					'28 Days Later',
					'Sunshine'
				]
			});
			expect(state).to.deep.equal({
				movies: [
					'Trainspotting',
					'28 Days Later'
				]
			});
		});

	});

});