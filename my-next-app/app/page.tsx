import Link from "next/link";



export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/about">About</Link>
      <Link href="/about/1">About 1</Link>
    </div>
  );
}
