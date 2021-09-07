import logo from './logo.svg';
import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import SearchComponent from './components/SearchComponent/SearchComponent';
import HomeComponent from './components/HomeComponent/HomeComponent';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import MovieDetailsComponent from './components/MovieDetailsComponent/MovieDetailsComponent';

function App() {
  return (
    
    <Router>
      <HeaderComponent/>
      <Route exact path="/"><HomeComponent/></Route>
      <Route path='/movies'><HomeComponent/></Route>
      <Route path='/tvshows'>Work in Progress</Route>
      <Route path='/kids'>Kids are stupid</Route>
      <Route path='/movie/:id'><MovieDetailsComponent/></Route>
    </Router>
  );
}

export default App;
