import logo from '@/assets/logo.png'
import { Link } from 'react-router';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const Footer = () => {
    return (
      <footer className="bg-black text-white">
        <section className="section pb-0">
          <div className="flex flex-col md:flex-row gap-6 md:justify-between">
            <div className="flex items-center gap-2 font-semibold italic justify-center">
              <img className="logo" src={logo} alt="logo" />
              <span>LitBase</span>
            </div>

            <div>
              <ul className='flex items-center justify-center gap-6'>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/books">Books</Link>
                </li>
                <li>
                  <Link to="/add-book">Add Book</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-4'>
            <Separator />
            <p className="flex justify-center items-center gap-3 py-4">
              <span className="font-semibold">{new Date().getFullYear()}</span>{" "}
              <Badge className="bg-white h-1 max-w-1 rounded-full" /> All Rights
              Reserved <Badge className="bg-white h-1 max-w-1 rounded-full" />
              <span className="italic font-semibold">LitBase</span>
            </p>
          </div>
        </section>
      </footer>
    );
};

export default Footer;