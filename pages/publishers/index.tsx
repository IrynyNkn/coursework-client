import React, { useState } from 'react';
import styles from '/styles/pages/games-management/GamesManagement.module.scss';
import { GetServerSideProps } from 'next';
import { PublisherType } from '../../utils/types/games';
import { useRouter } from 'next/router';
import Table from '../../components/common/Table';
import { toast } from 'react-toastify';

type PublishersType = {
  publishers: PublisherType[];
};

const Publishers = ({ publishers }: PublishersType) => {
  const router = useRouter();
  const [publishersList, setPublishersList] =
    useState<PublisherType[]>(publishers);

  const tableHead = ['#', 'Name', 'Actions'];

  const deletePublisher = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/publishers/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        console.log('ENTERED');
        setPublishersList(
          [...publishersList].filter((publisher) => publisher.id !== id)
        );
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
          fieldType: 'publishers',
          fieldId: id,
        },
      }),
    onDeleteClick: (id: string) => deletePublisher(id),
  };

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.headerBox}>
        <h1 className={styles.title}>Publishers List</h1>
        <button
          className={'green-button'}
          onClick={() =>
            router.push({
              pathname: '/games-management/fields/add',
              query: {
                fieldType: 'publishers',
              },
            })
          }>
          Add Publisher
        </button>
      </div>
      <Table
        tableHead={tableHead}
        tableBody={publishersList}
        cellRenderMethods={cellRenderMethods}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let publishers = [];

  try {
    const accessToken = req.cookies.GamelyAuthToken;

    const resPublishers = await fetch(`${process.env.API_URL}/publishers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    publishers = await resPublishers.json();
  } catch (e) {
    console.log('Error while fetching genres', e);
  }

  return {
    props: {
      publishers,
    },
  };
};

export default Publishers;
