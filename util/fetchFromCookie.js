import Cookie from 'js-cookie';
import parser from 'cookie';

export default async (req, options = {}) => {
  return (key) => {
    if (req) {
      // server
      const cookies = req.headers.cookie;
      if (!cookies) return null;
      const cookieMap = parser.parse(cookies, options);
      return cookieMap[key];
    } else {
      // browser
      return Cookie.get(key);
    }
  };
};
