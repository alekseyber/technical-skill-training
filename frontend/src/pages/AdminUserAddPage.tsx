import { CallbackSaveCompleteData, useMutationApp } from '@src/api/useMutationApp.hook';
import { PageBase, UserForm } from '@src/components';
import { PageBaseProps } from '@src/components/PageBase';
import { getLinkByRoutePath, RouteNames } from '@src/router/appRouterSettings';
import { useAppActions } from '@src/store/useRedux.hook';
import { TypeNameEnum, UserNewAdminDTO } from '@src/types/models';
import { UserRole } from '@src/types/models/UserDTO';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const initialDataValue: UserNewAdminDTO = {
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  userRole: UserRole.USER,
  status: true,
};

const AdminUserAddPage: FC = () => {
  const { showAlert } = useAppActions();

  const { callbackSave } = useMutationApp();
  const navigate = useNavigate();

  const onComplete = ({ data }: CallbackSaveCompleteData<UserNewAdminDTO>) => {
    showAlert('Пользователь добавлени.', 'success');
    if (data?._id) {
      return navigate(getLinkByRoutePath('ADMIN_USER_EDIT_PAGE', data?._id));
    }
    navigate(getLinkByRoutePath('ADMIN_USERS_PAGE'));
  };

  const bindPageBase: PageBaseProps = {
    title: 'Новый пользователь',
    maxWidth: 'md',
    breadcrumbsOn: true,
    breadcrumbsList: [
      { title: 'Пользователи', to: RouteNames.ADMIN_USERS_PAGE },
      { title: 'Новый пользователь' },
    ],
  };

  return (
    <PageBase {...bindPageBase}>
      <UserForm
        data={initialDataValue}
        admin={true}
        callbackSave={callbackSave<UserNewAdminDTO>({
          _id: '',
          typeName: TypeNameEnum.ADMIN_USER_ITEM,
          onComplete,
        })}
      />
    </PageBase>
  );
};
export default AdminUserAddPage;
//
