import 'bootstrap/dist/css/bootstrap.min.css';
import { CreatePollScreen } from './Screens/CreatePollScreen';
import { Header } from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PollDetailScreen } from './Screens/PollDetailScreen';
import { PollVotingScreen } from './Screens/PollVotingScreen';


function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreatePollScreen />} />
        <Route path="/poll/:name/" element={<PollVotingScreen />} />
        <Route path="/poll/:name/detail/" element={<PollDetailScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
