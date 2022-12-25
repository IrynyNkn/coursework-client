import React, { useState } from 'react';
import styles from '/styles/pages/games-management/GamesManagement.module.scss';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { apiUrl, proxyUrl } from '../../utils/consts';
import {
  CellRenderMethodsType,
  GenreType,
  PlatformsType,
} from '../../utils/types/games';
import Table from '../../components/common/Table';
import { toast } from 'react-toastify';

type GenresType = {
  genres: GenreType[];
};

const Genres = ({ genres }: GenresType) => {
  const router = useRouter();
  const [genresList, setGenresList] = useState<GenreType[]>(genres);

  const tableHead = ['#', 'Name', 'Actions'];

  const deleteGenre = async (id: string) => {
    try {
      const response = await fetch(`${proxyUrl}/genres/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        setGenresList([...genresList].filter((genre) => genre.id !== id));
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      toast.error('Internal Server Error');
    }
  };

  const cellRenderMethods = {
    onEditClick: (id: string) =>
      router.push({
        pathname: '/games-management/fields/add',
        query: {
          fieldType: 'genres',
          fieldId: id,
        },
      }),
    onDeleteClick: (id: string) => deleteGenre(id),
  };

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.headerBox}>
        <h1 className={styles.title}>Genres List</h1>
        <button
          className={'green-button'}
          onClick={() =>
            router.push({
              pathname: '/games-management/fields/add',
              query: {
                fieldType: 'genres',
              },
            })
          }>
          Add Genre
        </button>
      </div>
      <Table
        tableHead={tableHead}
        tableBody={genresList}
        cellRenderMethods={cellRenderMethods}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let genres = [];

  try {
    const accessToken = req.cookies.GamelyAuthToken;

    const resGenres = await fetch(`${apiUrl}/genres`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    genres = await resGenres.json();
  } catch (e) {
    console.log('Error while fetching genres', e);
  }

  return {
    props: {
      genres,
    },
  };
};

export default Genres;
