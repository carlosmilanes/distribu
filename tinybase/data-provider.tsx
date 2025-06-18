import { Provider } from 'tinybase/ui-react';
import { Inspector } from 'tinybase/ui-react-inspector';
import { Store } from './stores/store';

export function DataProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Store />
      {children}
      <Inspector />
    </Provider>
  );
}
