import { FC } from 'react';
import { NoFound, PageBase } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';

const bindPageBase: PageBaseProps = {
  breadcrumbsOn: true,
  breadcrumbsList: [{ title: 'Страница не найдена' }],
};

const NoFoundPage: FC = () => {
  return (
    <PageBase {...bindPageBase}>
      <NoFound />
    </PageBase>
  );
};

export default NoFoundPage;
