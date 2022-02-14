import { Main, PageBase, PageFetchBase } from '@src/components';
import { useProgTests } from '@src/store/reducers/progTests/useProgTests.hook';
import { FC } from 'react';

const MainPage: FC = () => {
  const { loading, error, data, refetch } = useProgTests();

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: refetch,
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase title="Все тесты">
        <Main data={data} />
      </PageBase>
    </PageFetchBase>
  );
};

export default MainPage;
