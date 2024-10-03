import { Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowProducts from './components/ShowProducts';
import ShowUsers from './components/ShowUsers';
import MenuBar from './components/menuBar';

function App() {
  return (

    <BrowserRouter>
       <MenuBar></MenuBar>

      <Routes>
        <Route path='/' element={<ShowProducts></ShowProducts>}></Route>
        <Route path='/users' element={<ShowUsers></ShowUsers>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
