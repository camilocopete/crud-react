import { Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowProducts from './components/ShowProducts';
import ShowUsers from './components/ShowUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowProducts></ShowProducts>}></Route>
        <Route path='/users' element={<ShowUsers></ShowUsers>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
