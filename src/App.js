import React from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo'
import Root from './pages'
import { client } from './configs/apollo'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
      <ApolloProvider client={client}>
        <Root></Root>
      </ApolloProvider>
  );
}

export default App;
