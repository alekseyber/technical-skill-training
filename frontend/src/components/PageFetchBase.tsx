import { FC } from 'react';
import { AccessIsDenied, ErrorContent, Loader, NoFound } from '@src/components';
import { ErrorContentProps } from './ErrorContent';

export interface PageFetchBaseProps extends ErrorContentProps {
  loading?: boolean;
}

const PageFetchBase: FC<PageFetchBaseProps> = ({
  children,
  error = null,
  loading = false,
  refetchHangler,
}) => {
  if (error) {
    if (error?.response?.status === 404) {
      return <NoFound />;
    }

    if (error?.response?.status === 403) {
      return <AccessIsDenied />;
    }

    return <ErrorContent error={error} refetchHangler={refetchHangler} />;
  }

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PageFetchBase;
