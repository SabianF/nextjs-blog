
import Head from "next/head";

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);

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
        <p>{postData.title}</p>
        <p>{postData.id}</p>
        <p>{postData.date}</p>
      </main>
    </Layout>
  );
}
