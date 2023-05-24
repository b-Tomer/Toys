import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import './assets/css/main.scss';
import { Home } from './views/home';
import { UserProfile } from './views/user-profile';
import { About } from './views/about';
import { ToyEdit } from './views/toy-edit';
import { ToyIndex } from './views/toy-index';
import { ToyDetails } from './views/toy-details';
import { Charts } from './views/charts';



export function App() {
  return (
    <div className="App">
         <Provider store={store}>
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/chart" element={<Charts />} />
                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    <Route path="/toy/details/:toyId" element={<ToyDetails />} />
                </Routes>
                <AppFooter />
            </section>
        </Router>
    </Provider>
    </div>
  )
}

// export default App
