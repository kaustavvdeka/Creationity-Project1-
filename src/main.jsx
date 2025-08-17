import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Signin from './components/Signin/Signin.jsx'
import Login from './components/Login/Login.jsx'
import User from './components/User/User.jsx'
import MyContent from './components/User/MyContent.jsx'
import Jokes from './components/content/Jokes.jsx'
import Story from './components/content/Story.jsx'
import Poem from './components/content/Poem.jsx'
import PickUpLine from './components/content/PickUpLine.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='signin' element={<Signin />} />
      <Route path='login' element={<Login />} />
      <Route path='profile' element={<User />} />
      <Route path='my-content' element={<MyContent />} />
      <Route path='jokes' element={<Jokes />} />
      <Route path='poem' element={<Poem />} />
      <Route path='story' element={<Story />} />
      <Route path='pickup-line' element={<PickUpLine />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
)