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
      <div className="grid place-items-center h-screen bg-gray-900">
        <GameBoard></GameBoard>
      </div>
    </>
  );
};

export default Home;
