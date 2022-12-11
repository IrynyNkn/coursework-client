import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/common/Layout";
import Card from "../components/pages/Card";
import styles from "/styles/pages/home/Home.module.scss";
import Filters from "../components/common/Filters";
import React, {useState} from "react";
import GamesList from "../components/pages/game/GamesList";
import ReactPaginate from "react-paginate";
import {GrNext, GrPrevious} from "react-icons/gr";

const Home: NextPage = () => {
  const itemsPerPage = 6;
  const [games, setGames] = useState(['', '', '', '', '', '', '', ''])
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = games.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(games.length / itemsPerPage);
  console.log('Page count', pageCount)
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % games.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Filters />
      <div className={styles.content}>
        <div className={styles.container}>
          <GamesList games={currentItems} />
          <ReactPaginate
            containerClassName={'pagination'}
            activeClassName={'active'}
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={() => null}
            pageClassName={'pagination-page'}
            nextClassName={`next ${endOffset >= games.length ? 'hidden' : ''}`}
            nextLabel={'Next'}
            previousClassName={`previous ${itemOffset === 0 ? 'hidden' : ''}`}
            previousLabel={'Previous'}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
