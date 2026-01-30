import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Events from './pages/Events';
import Collaborate from './pages/Collaborate';
import Visions from './pages/Visions';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Connections from './pages/Connections';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="community" element={<Community />} />
          <Route path="events" element={<Events />} />
          <Route path="collaborate" element={<Collaborate />} />
          <Route path="visions" element={<Visions />} />
          <Route path="messages" element={<Messages />} />
          <Route path="connections" element={<Connections />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
