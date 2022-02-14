import { CallbackSaveCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { useQueryApp } from '@src/api/useQueryApp.hook';
import { PageBase, PageFetchBase, UserForm } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';
import { useIsAuth } from '@src/router/useIsAuth.hook';
import { useAppActions } from '@src/store/useRedux.hook';
import { TypeNameEnum, UserBaseDTO } from '@src/types/models';
import { FC } from 'react';

const ProfilePage: FC = () => {
  const { showAlert } = useAppActions();
  const { loading, data, error, fetchData, setData } = useQueryApp<UserBaseDTO>(TypeNameEnum.USER_PROFILE);

  const { callbackSave } = useMutationApp();
  const { user } = useIsAuth();

  const onComplete = ({ data }: CallbackSaveCompleteData<UserBaseDTO>) => {
    showAlert('Изменения сохранены.', 'success');
    setData(data);
  };

  const bindPageFetchBase = {
    error,
    loading,
    refetchHangler: fetchData,
  };

  const bindPageBase: PageBaseProps = {
    title: `Профиль пользователя: ${user.username}`,
    breadcrumbsOn: true,
    breadcrumbsList: [{ title: 'Профиль' }],
  };

  return (
    <PageFetchBase {...bindPageFetchBase}>
      <PageBase {...bindPageBase}>
        {data && (
          <UserForm
            data={data}
            edit={true}
            callbackSave={callbackSave<UserBaseDTO>({
              _id: data._id,
              typeName: TypeNameEnum.USER_PROFILE,
              onComplete,
            })}
          />
        )}
      </PageBase>
    </PageFetchBase>
  );
};
export default ProfilePage;
//
