import React from 'react'
import Navbar from '../Components/Navbar'
import Announcement from '../Components/Announcement'
import Slider from '../Components/Slider'
import Categorie from '../Components/Category/Categories'
import Products from '../Components/Product/Products'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'
const Home = () => {
  return (
    <>
    <Announcement></Announcement>
    <Navbar></Navbar>
    <Slider></Slider>
    <Categorie></Categorie>
    <Products></Products>
    <Newsletter></Newsletter>
<Footer></Footer>
    </>
  )
}

export default Home