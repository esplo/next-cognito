import {Link} from '../routes';

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

export default Page;
