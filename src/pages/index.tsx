import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ランチックス</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center flex-col min-h-screen font-mono text-red-700">
        ランチックスを作るよ テスト<br />
        Tailwindが効いた！！
      </main>
    </>
  );
};

export default Home;
