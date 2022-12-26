import React from 'react';
import styles from '/styles/pages/games-management/Add.module.scss';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import {
  apiUrl,
  proxyUrl,
  rolesMapping,
  rolesOptions,
} from '../../../utils/consts';
import { UserType } from '../../../utils/types/users';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from '../../../utils';
import { useLoading } from '../../../utils/hooks/useLoading';
import { toast } from 'react-toastify';

type EditUserPagePropsType = {
  userData: UserType | null;
};

type FormSubmitType = {
  roles: {
    value: string;
    label: string;
  }[];
};

const EditUserPage = ({ userData }: EditUserPagePropsType) => {
  const {
    query: { id },
    push,
  } = useRouter();
  const { setLoading } = useLoading();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSubmitType>({
    defaultValues: userData
      ? {
          roles: userData.roles.map((role) => ({
            value: role,
            label: rolesMapping[role],
          })),
        }
      : {},
  });

  const onSubmit = async (data: FormSubmitType) => {
    const roles = data.roles.map((role) => role.value);
    const reqBody = {
      roles,
    };

    setLoading(true);
    try {
      const response = await fetch(`${proxyUrl}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        await push(`/users`);
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      console.log(`Error on changing user's roles`, e);
      toast.error('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Change User Roles</h1>
      <div className={styles.userInfo}>
        <div className={styles.infoBox}>
          <p className={styles.infoLabel}>Username: </p>
          <p>{userData?.userName}</p>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.infoLabel}>Email: </p>
          <p>{userData?.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div
          className={`${styles.inputWrapper} ${
            errors?.roles ? styles.error : ''
          }`}>
          <p className={styles.inputLabel}>Roles</p>
          <Controller
            control={control}
            name={'roles'}
            rules={{ required: true }}
            render={({ field: { value, onChange, ref } }) => (
              <Select
                ref={ref}
                options={rolesOptions}
                placeholder={'Roles'}
                isMulti={true}
                value={value}
                onChange={onChange}
                styles={selectStyles(!!errors?.roles)}
              />
            )}
          />
        </div>
        <button type={'submit'} className={'green-button'}>
          Submit Game
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const userId = query.id;
  const accessToken = req.cookies.GamelyAuthToken;
  let userData = null;

  const response = await fetch(`${apiUrl}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json();

  if (result.data) {
    userData = result.data;
  }

  return {
    props: {
      userData,
    },
  };
};

export default EditUserPage;
