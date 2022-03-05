import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import GameBoard from '../components/GameBoard';
import Modal from '../components/Modal';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Minewalker</title>
        <meta
          name="description"
          content="A take on the classic Minesweeper game"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex justify-center items-center w-full border-b-2 border-gray-400 p-2 mb-5">
        <h1 className="font-bold text-gray-50 text-3xl">Minewalker</h1>
      </nav>
      <div className="grid place-items-center max-h-screen">
        <GameBoard></GameBoard>
      </div>
    </>
  );
};

export default Home;
