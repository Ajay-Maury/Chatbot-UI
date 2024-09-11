import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import 'chatui/dist/index.css';
import { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import ChatContext from '../context/ChatContext';

function SafeHydrate({ children }: { children: ReactElement }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <ChakraProvider>
      <ChatContext>
        <div style={{ height: '100%' }}>
          <Toaster position="top-center" reverseOrder={false} />
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </div>
      </ChatContext>
    </ChakraProvider>
  );
};

export default App;

