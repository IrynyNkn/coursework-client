import React, { useMemo } from 'react';
import styles from '/styles/pages/games-management/GamesManagement.module.scss';
import { useRouter } from 'next/router';
import Table from '../../components/common/Table';
import { GetServerSideProps } from 'next';
import { apiUrl, proxyUrl } from '../../utils/consts';
import {
  CellRenderMethodsType,
  GameListType,
  GenreType,
  PlatformsType,
} from '../../utils/types/games';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient } from 'react-query';
import useGames from '../../utils/hooks/useGames';

const GamesManagement = () => {
  const router = useRouter();
  const { data: games, refetch } = useGames();

  const tableHead = ['#', 'Title', 'Genres', 'Platforms', 'Actions'];

  const tableBody = useMemo(() => {
    return games
      ? games.map((game) => ({
          id: game.id,
          title: game.title,
          genres: game.genres,
          platforms: game.platforms,
        }))
      : [];
  }, [games]);

  const deleteGame = async (id: string) => {
    try {
      const response = await fetch(`${proxyUrl}/games/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        await refetch();
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error('Internal Server Error');
    }
  };

  const cellRenderMethods = {
    renderCell: {
      genres: (genres: GenreType[]) =>
        genres.map((genre, idx) => (
          idx <= 3 ? <span className={styles.chip} key={genre.id}>
            {genre.name}
          </span> : idx === 4 ? <span className={styles.chip} key={genre.id}>{genres.length - idx}+</span> : null
        )),
      platforms: (platforms: PlatformsType[]) =>
        platforms.map((plt, idx) => (
          idx <= 3 ? <span className={styles.chip} key={plt.id}>
            {plt.name}
          </span> : idx === 4 ? <span className={styles.chip} key={plt.id}>{platforms.length - idx}+</span> : null
        )),
    },
    onEditClick: (id: string) =>
      router.push({
        pathname: '/games-management/add',
        query: { gameId: id },
      }),
    onDeleteClick: (id: string) => deleteGame(id),
  };

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.headerBox}>
        <h1 className={styles.title}>Games List</h1>
        <button
          className={'green-button'}
          onClick={() => router.push('/games-management/add')}>
          Add Game
        </button>
      </div>
      <Table
        tableHead={tableHead}
        tableBody={tableBody}
        cellRenderMethods={cellRenderMethods as CellRenderMethodsType}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('games', () =>
    fetch(`${apiUrl}/games`).then((res) => res.json())
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default GamesManagement;
