import React from 'react';

import LoaderSpinner from 'react-loader-spinner';

import { LoaderFade } from './styles.css';

const Loader = ({ showLoader }) => {
  return (
    <>
      {showLoader && (
        <LoaderFade>
          <LoaderSpinner
            type="ThreeDots"
            color="#FFFFFF"
            height={80}
            width={80}
          />
        </LoaderFade>
      )}
    </>
  );
};

export default Loader;
