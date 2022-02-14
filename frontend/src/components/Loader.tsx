import { FC } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const CssRoot = styled('div')`
  flex-grow: 1;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader: FC = () => {
  return (
    <CssRoot>
      <div>
        <CircularProgress size={30} thickness={5} disableShrink />
      </div>
    </CssRoot>
  );
};

export default Loader;
