import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ItemTestEdit, PageBase, PageFetchBase } from '@src/components';
import { GetItemTestEditDTO, ItemTestEditDTO, TypeNameEnum } from '@src/types/models';
import { PageBaseProps } from '@src/components/PageBase';
import { useQueryApp } from '@src/api/useQueryApp.hook';

const TestEditPage: FC = () => {
  const { _id } = useParams();

  const { loading, data, error, fetchData } = useQueryApp<ItemTestEditDTO, GetItemTestEditDTO>(
    TypeNameEnum.ADMIN_TEST_ITEM,
    {
      _id,
    }
  );

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: `Редактирование: ${data?.title}`,
    breadcrumbsOn: true,
    breadcrumbsList: [{ title: 'Редактирование теста' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>{data && <ItemTestEdit data={data} />}</PageBase>
    </PageFetchBase>
  );
};

export default TestEditPage;
