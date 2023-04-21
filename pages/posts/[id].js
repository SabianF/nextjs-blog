
import Head from "next/head";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  const staticProps = {
    props: {
      postData,
    },
  };

  return staticProps;
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  const staticPaths = {
    paths,
    fallback: false,
  };

  return staticPaths;
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <main>
        <h1 className={utilStyles.Head}>{postData.title}</h1>
        <p className={utilStyles.lightText}><Date dateString={postData.date} /></p>
        <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
      </main>
    </Layout>
  );
}
