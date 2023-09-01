import { LoadingProvider } from "./LoadingContext";
import Layout from "./layouts/Layout";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  
  return (
    <LoadingProvider>
      <Router>
        <Layout style={{ height: '100px' }}>
          <>

          </>
        </Layout>
      </Router>
    </LoadingProvider>
  );
}

export default App;

