export default function authHeader() { // Specific to the Node & Express backend
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }
  
  