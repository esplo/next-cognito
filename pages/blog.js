import * as React from 'react';
import {Link} from '../routes';
import PropTypes from 'prop-types';

const Page = ({slug}) =>
  <div>
    <Link href="/">
      <a>to Index</a>
    </Link><br/>

    {slug}
  </div>;

Page.getInitialProps = async ({query}) => {
  return {slug: query.slug};
};

Page.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Page;
