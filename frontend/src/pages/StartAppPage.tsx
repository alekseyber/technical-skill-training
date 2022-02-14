import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationApp } from '@src/api/useMutationApp.hook';
import { PageBase, UserForm } from '@src/components';
import { RouteNames } from '@src/router/appRouterSettings';
import { TypeNameEnum, UserNewDTO } from '@src/types/models';
import { useAppActions } from '@src/store/useRedux.hook';
import { PageBaseProps } from '@src/components/PageBase';

const StartAppPage: FC = () => {
  const { callbackSave } = useMutationApp();
  const { showAlert } = useAppActions();

  const navigate = useNavigate();

  const onLogin = () => {
    showAlert('Регистрация прошла успешно.', 'success');
    navigate(RouteNames.MAIN_PAGE);
  };

  const bindPageBase: PageBaseProps = {
    title: 'Регистрация администратора на старте',
    maxWidth: 'md',
    breadcrumbsOn: true,
    breadcrumbsHomeOn: false,
    breadcrumbsList: [{ title: 'Вход', to: RouteNames.LOGIN_PAGE }, { title: 'Регистрация на старте' }],
  };

  return (
    <PageBase {...bindPageBase}>
      <UserForm
        edit={false}
        textBtn="Зарегистироваться"
        callbackSave={callbackSave<UserNewDTO>({
          _id: '',
          typeName: TypeNameEnum.START_REGISTRATION,
          onLogin,
        })}
      />
    </PageBase>
  );
};

export default StartAppPage;
