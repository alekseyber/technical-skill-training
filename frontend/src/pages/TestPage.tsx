import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ItemTest, PageBase, PageFetchBase } from '@src/components';
import { GetItemTestDTO, ItemTestDTO, TypeNameEnum } from '@src/types/models';
import { useQueryApp } from '@src/api/useQueryApp.hook';

const TestPage: FC = () => {
  const { _id } = useParams();
  const { loading, data, error, fetchData } = useQueryApp<ItemTestDTO, GetItemTestDTO>(
    TypeNameEnum.TEST_ITEM,
    { _id }
  );

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase title={data?.title}>{data && <ItemTest data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default TestPage;
