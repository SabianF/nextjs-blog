
import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getCatFactsData } from '../lib/cat-facts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const catFactsData = await getCatFactsData();

  return {
    props: {
      allPostsData,
      catFactsData,
    },
  };
}

export default function Home({
  allPostsData,
  catFactsData,
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! I'm Sabian.</p>
        <p>
          This is my sample website.
        </p>
        <Link href="/posts/first-post">First post</Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>{title}</Link><br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Cat fact</h2>
        <p>{catFactsData.fact}</p>
      </section>
    </Layout>
  );
}
