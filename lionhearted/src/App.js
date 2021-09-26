import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MapPage from './pages/map/MapHome';
import CatchPage from './pages/catch/CatchPage';
import CleanPage from './pages/clean/CleanPage';
import CookPage from './pages/cook/CookPage';
import FAQPage from './pages/faq/FAQPage';
import AboutPage from './pages/about/AboutPage';
import LoginPage from './pages/login/LoginPage';
import HowToPage from './pages/howto/HowToPage';
import './App.css';


const App = props => {

  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const user = useSelector(state => state.user);

  return (
    <>
      <main>
        <BrowserRouter>
          {user !== undefined && <Navbar container={container} />}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" render={() => (user === undefined ? <Redirect to={"/login"} /> : <MapPage/>)}/>
          <Route exact path="/catch" render={() => (user === undefined ? <Redirect to={"/login"} /> : <CatchPage/>)} />
          <Route exact path="/clean" render={() => (user === undefined ? <Redirect to={"/login"} /> : <CleanPage/>)} />
          <Route exact path="/cook" render={() => (user === undefined ? <Redirect to={"/login"} /> : <CookPage/>)} />
          <Route exact path="/faq" render={() => (user === undefined ? <Redirect to={"/login"} /> : <FAQPage/>)} />
          <Route exact path="/about" render={() => (user === undefined ? <Redirect to={"/login"} /> : <AboutPage/>)} />
          <Route exact path="/howto" render={() => (user === undefined ? <Redirect to={"/login"} /> : <HowToPage/>)} />
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
