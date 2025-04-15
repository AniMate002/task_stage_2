// import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IUser } from '../../types/common.types';
// import { fetchUsersService } from '../../services/user.service';

// interface IInitialState {
//     users: Array<IUser>;
//     isLoading: boolean;
//     error: string | null;
// }

// const initialState: IInitialState = {
//     users: [],
//     isLoading: false,
//     error: null,
// };

// export const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUsersService.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.error = null;
//                 state.users = action.payload;
//             })
//             .addMatcher(isLoading, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addMatcher(isError, (state, action: PayloadAction<string>) => {
//                 state.isLoading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// function isError(action: AnyAction) {
//     return action.type.endsWith('rejected');
// }

// function isLoading(action: AnyAction) {
//     return action.type.endsWith('pending');
// }
