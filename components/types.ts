// types.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};