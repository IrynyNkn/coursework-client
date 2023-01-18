import styles from '/styles/pages/home/Home.module.scss';
import Filters from '../components/common/Filters';
import React, { useEffect, useState } from 'react';
import GamesList from '../components/pages/game/GamesList';
import ReactPaginate from 'react-paginate';
import { GetServerSideProps } from 'next';
import { GameListType } from '../utils/types/games';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import SearchBar from '../components/common/SearchBar';

type HomePropsType = {
  totalCount: number;
  games: GameListType[];
  take: number;
  skip: number;
};

const Home = ({ totalCount, games, skip }: HomePropsType) => {
  const router = useRouter();
  const itemsPerPage = 9;
  const endOffset = skip + itemsPerPage;
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  const parsedSearchQuery = router.query.searchQuery;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const pagginationHandler = async (event: any) => {
    const currentPath = router.pathname;
    const skipValue = (event.selected * itemsPerPage) % totalCount;

    await router.push({
      pathname: currentPath,
      query: {
        skip: skipValue,
      },
    });
  };

  const clickSearchBtn = async () => {
    const path = router.asPath;
    const indexOfSearchQuery = path.indexOf('searchQuery');
    let searchQueryParam = '';

    if(indexOfSearchQuery < 0) {
      searchQueryParam = `${path}${path.length > 1 ? '&' : '?'}searchQuery=${searchQuery}`;
    } else {
      const croppedPath = path.slice(0, indexOfSearchQuery - 1);
      searchQueryParam = `${croppedPath}${croppedPath.length > 1 ? '&' : '?'}searchQuery=${searchQuery}`;
    }

    await router.push(searchQueryParam)
  };

  useEffect(() => {
    setSearchQuery((parsedSearchQuery || '') as string);
  }, [parsedSearchQuery]);

  return (
    <>
      <Filters />
      <div className={styles.content}>
        <div className={styles.searchContainer}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            mainScreen={true}
            clickSearchBtn={clickSearchBtn}
          />
        </div>
        <div className={styles.container}>
          {
            games.length === 0 ?
              <div className={styles.emptyWrapper}>
                <p className={styles.emptyText}>There is no games that match your request :(</p>
              </div>
              :
              <>
                <GamesList games={games} />
                <ReactPaginate
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  breakLabel="..."
                  onPageChange={pagginationHandler}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  renderOnZeroPageCount={() => null}
                  pageClassName={'pagination-page'}
                  nextClassName={`next ${endOffset >= totalCount ? 'hidden' : ''}`}
                  nextLabel={'Next'}
                  previousClassName={`previous ${skip <= 0 ? 'hidden' : ''}`}
                  previousLabel={'Previous'}
                />
              </>
          }
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const take = query.take || 9;
  const skip = query.skip || 0;
  const genres = query.genres ?? '';
  const publishers = query.publishers ?? '';
  const platforms = query.platforms ?? '';
  const searchQuery = query.searchQuery ?? '';
  const accessToken = req.cookies.GamelyAuthToken;
  let games = [];
  let totalCount = 0;

  const filtersQuery = `${genres ? '&genres=' + genres : ''}${
    platforms ? '&platforms=' + platforms : ''
  }${publishers ? '&publishers=' + publishers : ''}${searchQuery ? ('&searchQuery=' + searchQuery) : ''}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('platforms', () =>
    fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/platforms`).then((res) => res.json())
  );
  await queryClient.prefetchQuery('genres', () =>
    fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/genres`).then((res) => res.json())
  );
  await queryClient.prefetchQuery('publishers', () =>
    fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/publishers`).then((res) => res.json())
  );
  try {
    const res = await fetch(
      `${process.env.API_URL}/games?take=${take}&skip=${skip}${filtersQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await res.json();

    if (!result.error && result.data) {
      games = result.data.map((game: any) => {
        return {
          ...game,
          genres: game.genres.map((genre: any) => genre.genre),
          platforms: game.platforms.map((plt: any) => plt.platform),
        };
      });
      totalCount = result.meta.totalCount;
    }
  } catch (e) {
    console.log('Error while fetching games', e);
  }

  return {
    props: {
      totalCount,
      games,
      take,
      skip,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
