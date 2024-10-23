import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import ImageUpload from './upload_image/ImageUpload';

import Statistics from './Statistics/Statistics';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Statistics />
      <ImageUpload/>
    </div>
  );
}

export default App;
