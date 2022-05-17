import { OsmiProvider } from 'osmicsx';
import GlobalTheme from './global-theme';

export const { apply, connect } = OsmiProvider(GlobalTheme);
