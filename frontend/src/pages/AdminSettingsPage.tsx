import { CallbackSaveCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useQueryApp } from '@src/api/useQueryApp.hook';
import { PageBase, PageFetchBase, SettingsForm } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';
import { useAppActions } from '@src/store/useRedux.hook';
import { SettingsDTO, TypeNameEnum } from '@src/types/models';
import { FC } from 'react';

const AdminSettingsPage: FC = () => {
  const { loading, data, error, fetchData, setData } = useQueryApp<SettingsDTO>(TypeNameEnum.ADMIN_SETTINGS);
  const { showAlert } = useAppActions();
  const { callbackSave } = useMutationApp();

  const onComplete = ({ data }: CallbackSaveCompleteData<SettingsDTO>) => {
    showAlert('Изменения сохранены.', 'success');
    setData(data);
  };

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: 'Настройки',
    maxWidth: 'lg',
    breadcrumbsOn: true,
    breadcrumbsList: [{ title: 'Настройки' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>
        {data && (
          <SettingsForm
            data={data}
            callbackSave={callbackSave<SettingsDTO>({
              _id: data._id,
              typeName: TypeNameEnum.ADMIN_SETTINGS,
              onComplete,
            })}
          />
        )}
      </PageBase>
    </PageFetchBase>
  );
};

export default AdminSettingsPage;
