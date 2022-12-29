import styles from '/styles/pages/home/Home.module.scss';
import Filters from '../components/common/Filters';
import React from 'react';
import GamesList from '../components/pages/game/GamesList';
import ReactPaginate from 'react-paginate';
import { GetServerSideProps } from 'next';
import { apiUrl } from '../utils/consts';
import { GameListType } from '../utils/types/games';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

type HomePropsType = {
  totalCount: number;
  games: GameListType[];
  take: number;
  skip: number;
};

const Home = ({ totalCount, games, take, skip }: HomePropsType) => {
  const router = useRouter();
  const itemsPerPage = 9;
  const endOffset = skip + itemsPerPage;
  const pageCount = Math.ceil(totalCount / itemsPerPage);

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

  return (
    <>
      <Filters />
      <div className={styles.content}>
        <div className={styles.container}>
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
  const accessToken = req.cookies.GamelyAuthToken;
  let games = [];
  let totalCount = 0;

  const filtersQuery = `${genres ? '&genres=' + genres : ''}${
    platforms ? '&platforms=' + platforms : ''
  }${publishers ? '&publishers=' + publishers : ''}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('platforms', () =>
    fetch(`${apiUrl}/platforms`).then((res) => res.json())
  );
  await queryClient.prefetchQuery('genres', () =>
    fetch(`${apiUrl}/genres`).then((res) => res.json())
  );
  await queryClient.prefetchQuery('publishers', () =>
    fetch(`${apiUrl}/publishers`).then((res) => res.json())
  );

  try {
    const res = await fetch(
      `${apiUrl}/games?take=${take}&skip=${skip}${filtersQuery}`,
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
