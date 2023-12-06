import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers';

// Define your state types here
type UserType = {
  // Define user properties here
};

type CourseType = {
  // Define course properties here
};

type YourStateType = RootState & {
  user: UserType,
  courses: CourseType[],
  // other state properties...
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware<YourStateType>(),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, YourStateType, unknown, Action<string>>;

export default store;