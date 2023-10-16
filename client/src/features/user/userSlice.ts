import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../utils/Types'

export const userSlice = createSlice({
	name: 'user',
	initialState: [] as User[],
	reducers: {
		getUser: (state, action) => {
			state.push(action.payload)
		},
	},
})

export default userSlice.reducer

export const { getUser } = userSlice.actions
