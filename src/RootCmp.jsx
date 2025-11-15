
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { UserIndex } from './pages/userIndex.jsx'
import { UserEdit } from './cmps/UserEdit.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'

export function App() {
    return (
        <Router>
            <AppHeader />
            <main className='container'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/bug' element={<BugIndex />} />
                    <Route path='/user' element={<UserIndex />} />
                    <Route path='/user/edit/:userId' element={<UserEdit />} />
                    <Route path='/user/edit/' element={<UserEdit />} />
                    <Route path='/login' element={<LoginSignup signup={true}/>} />
                    <Route path='/signup' element={<LoginSignup signup={false}/>} />
                    <Route path='/bug/:bugId' element={<BugDetails />} />
                    <Route path='/about' element={<AboutUs />} />
                </Routes>
            </main>
            <AppFooter />
        </Router>
    )
}
