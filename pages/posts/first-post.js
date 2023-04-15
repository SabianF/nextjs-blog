
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <main>
        <h1>First Post</h1>
        <Image
          src="/images/profile.jpg"
          width={256}
          height={256}
          alt="Sabian Finogwar profile picture"
        />
        <h2>
          <Link href="/">Back to home</Link>
        </h2>
      </main>
    </Layout>
  );
}
