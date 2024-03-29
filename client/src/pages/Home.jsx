import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newslatter from '../components/Newslatter'
import Products from '../components/Products'
import Slider from '../components/Slider'



const Home = () => {
  console.log(process.env)
  return (
    <div>
        <Announcement/>
        <Navbar />
        <Slider/>
        <Categories/>
        <Products/>
        <Newslatter/>
        <Footer/>
    </div>
  )
}

export default Home