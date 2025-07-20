'use client';

import { Provider } from 'react-redux';
import { store } from './store';

// Interface untuk props ReduxProvider
interface ReduxProviderProps {
  children: React.ReactNode;
}

// Component ReduxProvider untuk membungkus aplikasi dengan Redux store
export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
