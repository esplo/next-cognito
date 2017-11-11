import {Link} from '../routes';

const Page = ({stars}) =>
  <div>
    <Link href="/">
      <a>to Index</a>
    </Link><br />

    Next stars: {stars}
  </div>;

Page.getInitialProps = async ({req}) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();
  return {stars: json.stargazers_count};
};

export default Page;
