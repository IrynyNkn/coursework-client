import React from 'react';
import {useLoading} from "../../utils/hooks/useLoading";

type LoaderPropsType = {
  // isLoading: boolean
}

const Loader = ({}: LoaderPropsType) => {
  const {loading} = useLoading();

  return (
    <div className={`backdrop ${loading ? 'is-visible' : ''}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;