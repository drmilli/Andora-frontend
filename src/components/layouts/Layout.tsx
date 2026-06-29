import { Outlet, useLocation } from "react-router-dom";
import { Footer } from './Footer';
import { Nav } from './Nav';
import ContactForm from '@/components/contact-us/ContactForm';

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/verify-otp', '/reset-password'];

const Layout = () => {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Nav />}

      <div className="">
        <main className="">
          <Outlet />
        </main>
        {!isAuthPage && <ContactForm />}
        {!isAuthPage && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
