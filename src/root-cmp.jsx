import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import './assets/css/main.css';
import { Home } from './views/home';
import { UserProfile } from './views/user-profile';
import { About } from './views/about';
import { TodoEdit } from './views/todo-edit';


export function App() {
  return (
    <div className="App">
         <Provider store={store}>
        <Router>
            <section className="app ">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/todo" element={<TodoIndex />} />
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="/about" element={<About />} />
                    {/* <Route path="/todo/edit/:todoId" element={<TodoEdit />} /> */}
                    {/* <Route path="/todo/details/:todoId" element={<TodoDetails />} /> */}
                </Routes>
                <AppFooter />
            </section>
        </Router>
    </Provider>
    </div>
  )
}

// export default App
