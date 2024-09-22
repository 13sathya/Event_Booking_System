import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import OwnerLoginscreen from './screens/OwnerLoginscreen';

function App() {
  return (
    <div className="App">
      {/* <h1>Events</h1> */}
      <Navbar/>
      <Router>
        <Routes>
                <Route  path="/home"exact Component={Homescreen}/>
                <Route  path="/book/:hallid/:fromdate/:todate" exact Component={Bookingscreen}/>
                <Route  path="/register" exact Component={Registerscreen}/>
                <Route  path="/login" exact Component={Loginscreen}/>
                <Route  path="/profile" exact Component={Profilescreen}/>
                <Route  path="/admin" exact Component={Adminscreen}/>
                <Route path='/' exact Component={Landingscreen}/>
                <Route path='/ownerlogin' exact Component={OwnerLoginscreen}/>

               



                

                

        </Routes>
        {/* <Routes>
                <Route  path="/book/:hallid" exact Component={Bookingscreen}/>
        </Routes> */}
      </Router>
    </div>
 


);
}

export default App;
