
import Link from "next/link";
import Image from "next/image";

export default function FirstPost() {
  return (
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
  );
}
