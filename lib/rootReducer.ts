import { combineReducers, Action, Reducer } from 'redux'
import auth, { AuthState } from '@/store/features/authSlice'
import layout, { LayoutState } from '@/store/features/layoutSlice'


export type RootState = {
	auth: AuthState;
	layout: LayoutState;
}

export interface AsyncReducers {
	[key: string]: Reducer<any, Action>
}

const staticReducers = {
	auth,
	layout
}

const rootReducer =
	(asyncReducers?: AsyncReducers) => (state: RootState, action: Action) => {
		const combinedReducer = combineReducers({
			...staticReducers,
			...asyncReducers,
		})
		return combinedReducer(state, action)
	}

export default rootReducer
