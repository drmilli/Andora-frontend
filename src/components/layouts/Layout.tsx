import { Outlet } from "react-router-dom";
import { Footer } from './Footer';
import { Nav } from './Nav';
import ContactForm from '@/components/contact-us/ContactForm';



const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Nav />
      <div className="">

        <main className="">
       <Outlet/>
        </main>
        <ContactForm/>   
        <Footer/>
      </div>
    </div>



  );
};

export default Layout;
