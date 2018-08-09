import * as React from 'react';
import fetch from 'isomorphic-unfetch';
import {Link} from '../routes';
import PropTypes from 'prop-types';

const Page = ({stars}) =>
  <div>
    <Link href="/">
      <a>to Index</a>
    </Link><br />

    Next stars: {stars}
  </div>;

Page.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();
  return {stars: json.stargazers_count};
};

Page.propTypes = {
  stars: PropTypes.number.isRequired,
};

export default Page;
