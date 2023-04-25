
import Head from "next/head";
import {GetStaticProps, GetStaticPaths, GetServerSideProps} from 'next';

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  const staticProps = {
    props: {
      postData,
    },
  };

  return staticProps;
}

const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  const staticPaths = {
    paths,
    fallback: false,
  };

  return staticPaths;
}

const Post = ({ postData }) => {

  const htmlHead = (
      <Head>
        <title>{postData.title}</title>
      </Head>
    );

  const htmlPost = (
    <Layout>
      {postHead()}
      {postBody()}
    </Layout>
  );

  return htmlPost;

  function postHead() {
    return (
      <Head>
        <title>{postData.title}</title>
      </Head>
    );
  }

  function postBody() {
    return (
      <main>
        <h1 className={utilStyles.Head}>{postData.title}</h1>
        <p className={utilStyles.lightText}><Date dateString={postData.date} /></p>
        <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
      </main>
    );
  }
}

export default Post;

export {
  getStaticProps,
  getStaticPaths,
};
