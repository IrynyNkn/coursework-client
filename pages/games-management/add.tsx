import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Layout from "../../components/common/Layout";
import styles from "/styles/pages/games-management/Add.module.scss";
import Select from "react-select";
import {useForm, Controller} from "react-hook-form";
import {ageRestrictions, apiUrl, proxyUrl} from "../../utils/consts";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {TbFileUpload} from "react-icons/tb";
import {GameFormType, GenreType, PlatformsType, PublisherType} from "../../utils/types/games";
import {useLoading} from "../../utils/hooks/useLoading";
import {BiImageAdd} from "react-icons/bi";
import {useDropzone} from "react-dropzone";
import {GetServerSideProps} from "next";
import {toast} from "react-toastify";
import login from "../login";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const selectStyles = (isError: boolean) => ({
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    borderColor: isError ? '#c62828' : (state.isFocused) ? '#49c5b6' : '#dbe0df',
    boxShadow: 'none',
    paddingTop: 4,
    paddingBottom: 4,
    '&:hover': {
      borderColor: '#49c5b6'
    }
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? '#49c5b6' : '',
    '&:hover': {
      backgroundColor: state.isSelected ? '#49c5b6' : 'rgba(73,197,182,0.2)'
    }
  }),
  placeholder: (baseStyles: any) => ({
    ...baseStyles,
    color: isError ? '#c62828' : '#a6abab'
  }),
});

type AddGameProps = {
  platforms: PlatformsType[] | null,
  genres: GenreType[] | null,
  publishers: PublisherType[] | null
}

const Add = ({platforms, genres, publishers}: AddGameProps) => {
  const { setLoading } = useLoading();
  const [selectedImage, setSelectedImage] = useState<File | null | undefined>()
  const [preview, setPreview] = useState<string>();
  const platformsOptions = useMemo(() => {
    return platforms ? platforms.map(plt => ({
      value: plt.id,
      label: plt.name
    })) : [];
  }, [platforms]);
  const genresOptions = useMemo(() => {
    return genres ? genres?.map(genre => ({
      value: genre.id,
      label: genre.name
    })) : [];
  }, [genres]);
  const publishersOptions = useMemo(() => {
    return publishers ?  publishers.map(publisher => ({
      value: publisher.id,
      label: publisher.name
    })) : [];
  }, [publishers]);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<GameFormType>();

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedImage)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      setSelectedImage(file);
    })
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop, multiple: false});

  const onSubmit = async (data: GameFormType) => {
    console.log('data', data)
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('file', selectedImage as never as Blob);
    formData.append('publisherId', data.publisherId);
    formData.append('ageRestriction', data.ageRestriction);
    formData.append('releaseYear', data.releaseYear);
    formData.append('genres', JSON.stringify(data.genres.map((genre) => genre.value)));
    formData.append('platforms', JSON.stringify(data.platforms.map((plt) => plt.value)));

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/games`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if(result.error) {
        const errorMsg = typeof result.message === 'string' ? result.message : result.message[0];
        toast.error(errorMsg || 'Oops, something went wrong');
      } else {
        toast.success('Game is successfully created');
      }
      console.log('Result', result)
    } catch (e) {
      toast.error('Error while creating game');
      console.log('Error while creating game')
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const image = e?.target?.files?.[0];
    setSelectedImage(image);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Game</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={`${styles.inputWrapper} ${errors?.title ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Title</p>
          <input
            placeholder={'Title'}
            className={styles.input}
            {...register('title', {
              required: true
            })}
          />
        </label>
        <div className={`${styles.inputWrapper} ${errors?.publisherId ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Publisher</p>
          <Controller
            control={control}
            name={'publisherId'}
            rules={{required: true}}
            render={({ field: {value, onChange, ref}, fieldState, formState }) =>
              <Select
                ref={ref}
                options={publishersOptions}
                placeholder={'Publisher'}
                value={options.find(c => c.value === value)}
                onChange={val => onChange(val?.value)}
                styles={selectStyles(!!errors?.publisherId)}
              />
            }
          />
        </div>
        <div className={`${styles.inputWrapper} ${errors?.genres ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Genres</p>
          <Controller
            control={control}
            name={'genres'}
            rules={{required: true}}
            render={({ field: {value, onChange, ref} }) =>
              <Select
                ref={ref}
                options={genresOptions}
                placeholder={'Genres'}
                isMulti={true}
                value={options.find(c => c.value === value as unknown as string)}
                onChange={val => onChange(val)}
                styles={{
                  ...(selectStyles(!!errors?.genres)),
                  multiValue: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    border: '1.5px solid #39988f',
                    borderRadius: 15,
                    color: '#39988f',
                    '& div:last-child:hover': {
                      backgroundColor: 'transparent'
                    },
                  })
                }}
              />
            }
          />
        </div>
        <div className={`${styles.inputWrapper} ${errors?.platforms ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Platforms</p>
          <Controller
            control={control}
            name={'platforms'}
            rules={{required: true}}
            render={({ field: {value, onChange, ref} }) =>
              <Select
                ref={ref}
                options={platformsOptions}
                placeholder={'Platforms'}
                isMulti={true}
                value={options.find(c => c.value === value as unknown as string)}
                onChange={val => onChange(val)}
                styles={{
                  ...(selectStyles(!!errors?.platforms)),
                  multiValue: (baseStyles: any, state: any) => ({
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    border: '1.5px solid #39988f',
                    borderRadius: 15,
                    color: '#39988f',
                    '& div:last-child:hover': {
                      backgroundColor: 'transparent'
                    },
                  })
                }}
              />
            }
          />
        </div>
        <div className={`${styles.inputWrapper} ${errors?.ageRestriction ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Age Restriction</p>
          <Controller
            control={control}
            name={'ageRestriction'}
            rules={{required: true}}
            render={({ field: {value, onChange, ref}, fieldState, formState }) =>
              <Select
                ref={ref}
                options={ageRestrictions}
                placeholder={'Age Restriction'}
                value={options.find(c => c.value === value)}
                onChange={val => onChange(val?.value)}
                styles={selectStyles(!!errors?.ageRestriction)}
              />
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <p className={styles.inputLabel}>Game Image</p>
          <div {...getRootProps({className: 'drop-zone'})}>
            <input
              type="file"
              name="gameImage"
              {...getInputProps()}
            />
            {
              preview ?
                <img className={styles.uploadedImg} src={preview} alt={'uploaded-image'} /> :
                <>
                  <BiImageAdd size={32} />
                  <p className={styles.dropzoneText}>Drag 'n' drop image</p>
                </>
            }
          </div>
          <label className={styles.fileInput}>
            <input
              type="file"
              name="gameImage"
              onChange={uploadImage}
            />
            {
              selectedImage ?
                <>
                  <IoMdCheckmarkCircleOutline size={20} className={styles.icon} />
                  {selectedImage.name}
                </> :
                <>
                  <TbFileUpload size={20} className={styles.icon} />
                  Upload Game Image
                </>
            }
          </label>
        </div>
        <label className={`${styles.inputWrapper} ${errors?.releaseYear ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Release Year</p>
          <input
            placeholder={'Release Year'}
            className={styles.input}
            type='number'
            {...register('releaseYear', {
              required: true,
              min: 1900,
              max: 2022
            })}
          />
        </label>
        <div className={`${styles.inputWrapper} ${errors?.description ? styles.error : ''}`}>
          <p className={styles.inputLabel}>Description</p>
          <textarea
            rows={7}
            placeholder={'Description'}
            className={styles.textarea}
            {...register('description', {
              required: true
            })}
          ></textarea>
        </div>
        <button type={'submit'} className={'green-button'}>Submit Game</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let platforms = null;
  let genres = null;
  let publishers = null;

  try {
    const accessToken = context.req.cookies.GamelyAuthToken;
    console.log(`${apiUrl}/platforms`)
    const resPlatforms = await fetch(`${apiUrl}/platforms`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const resPublishers = await fetch(`${apiUrl}/publishers`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const resGenres = await fetch(`${apiUrl}/genres`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    platforms = await resPlatforms.json();
    console.log('Platforms', platforms)
    genres = await resGenres.json();
    publishers = await resPublishers.json();
  } catch (e) {
    console.log('Error while fetching data for Add page', e);
  }

  return {
    props: {
      platforms,
      genres,
      publishers
    }
  }
}

export default Add;