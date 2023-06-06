import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('https://codejays-backend.onrender.com/api/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 200) {
            handleLogout();
            navigate('/');
          } else {
            throw new Error('Logout failed.');
          }
        } catch (err) {
          console.error(err);
        }
      };
      logout();
    }, [handleLogout, navigate]);
  return null;
};

export default Logout;
