import { AppStates } from './constants';
import logger from './logger';

export function* appStateMachine(): Generator<AppStates, AppStates, AppStates> {
	let previousState = AppStates.READY;
	let currentState = AppStates.READY;
	const setState = (newState: AppStates) => {
		previousState = currentState;
		currentState = newState;
		logger.logInfo(
			'App State Change ! :: Previous state : ' + previousState + ':: New State : ' + newState
		);
		return newState;
	};
	while (true) {
		const nextState = yield;
		if (nextState) {
			setState(nextState);
			if (nextState === AppStates.EXITING) {
				return currentState;
			}
		}
	}
}
