import { useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

/**
 * Custom hook to handle user authentication (login, logout, and token management)
 */
export function useAuthApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null

  // Login function to authenticate the user
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulating authentication logic
      if (username === 'user123' && password === 'Password@123') {
        const newAccessToken = 'mockAccessToken'; // Hardcoded access token
        const newRefreshToken = 'mockRefreshToken'; // Hardcoded refresh token

        // Store tokens in cookies using js-cookie
        Cookies.set('accessToken', newAccessToken, { expires: 1 }); // Expires in 1 day
        Cookies.set('refreshToken', newRefreshToken, { expires: 7 }); // Expires in 7 days

        // Redirect user to the protected page
        window.location.href = '/dashboard';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.'); // This is now valid
    } finally {
      setLoading(false);
    }
  };

  // Logout function to clear tokens and redirect to the login page
  const logout = () => {
    // Remove tokens from cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    // Redirect to login page
    window.location.href = '/';
  };

  return {
    login,
    logout,
    loading,
    error,
  };
}
