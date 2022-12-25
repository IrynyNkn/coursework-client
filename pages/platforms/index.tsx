import React, { useState } from 'react';
import styles from '/styles/pages/games-management/GamesManagement.module.scss';
import { GetServerSideProps } from 'next';
import { apiUrl, proxyUrl } from '../../utils/consts';
import { useRouter } from 'next/router';
import {
  GenreType,
  PlatformsType as PlatformType,
} from '../../utils/types/games';
import Table from '../../components/common/Table';
import { toast } from 'react-toastify';

type PlatformsType = {
  platforms: PlatformType[];
};

const Platforms = ({ platforms }: PlatformsType) => {
  const router = useRouter();
  const [platformsList, setPlatformsList] = useState<PlatformType[]>(platforms);

  const tableHead = ['#', 'Name', 'Actions'];

  const deletePlatform = async (id: string) => {
    try {
      const response = await fetch(`${proxyUrl}/platforms/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        setPlatformsList([...platformsList].filter((genre) => genre.id !== id));
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
          fieldType: 'platforms',
          fieldId: id,
        },
      }),
    onDeleteClick: (id: string) => deletePlatform(id),
  };

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.headerBox}>
        <h1 className={styles.title}>Platforms List</h1>
        <button
          className={'green-button'}
          onClick={() =>
            router.push({
              pathname: '/games-management/fields/add',
              query: {
                fieldType: 'platforms',
              },
            })
          }>
          Add Platform
        </button>
      </div>
      <Table
        tableHead={tableHead}
        tableBody={platformsList}
        cellRenderMethods={cellRenderMethods}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let platforms = [];

  try {
    const accessToken = req.cookies.GamelyAuthToken;

    const resPlatforms = await fetch(`${apiUrl}/platforms`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    platforms = await resPlatforms.json();
  } catch (e) {
    console.log('Error while fetching genres', e);
  }

  return {
    props: {
      platforms,
    },
  };
};

export default Platforms;
