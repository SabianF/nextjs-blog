
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
      {homeHead()}
      {homeIntroBlock()}
      {homeMainBlock()}
      {homeFooter()}
    </Layout>
  );

  function homeHead() {
    return (
      <Head>
        <title>{siteTitle}</title>
      </Head>
    );
  }

  function homeIntroBlock() {
    return (
      <section className={utilStyles.headingMd}>
        <p>Hi! I'm Sabian.</p>
        <p>This is my sample website.</p>
      </section>
    );
  }

  function homeMainBlock() {
    return (
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
    );
  }

  function homeFooter() {
    return (
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Cat fact</h2>
        <p>{catFactsData.fact}</p>
      </section>
    );
  }
}
