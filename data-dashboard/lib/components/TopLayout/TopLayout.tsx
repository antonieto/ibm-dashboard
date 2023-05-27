import { ToastContainer } from 'react-toastify';
import NavBar from '../NavBar/NavBar';

interface TopLayoutProps {
  children: React.ReactNode;
}

function TopLayout({ children }: TopLayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default TopLayout;
