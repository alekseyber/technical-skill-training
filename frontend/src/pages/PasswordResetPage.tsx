import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutationApp } from '@src/api/useMutationApp.hook';
import { PageBase, PasswordResetForm } from '@src/components';
import { RouteNames } from '@src/router/appRouterSettings';
import { TypeNameEnum, PasswordResetDTO } from '@src/types/models';
import { useAppActions } from '@src/store/useRedux.hook';
import { PageBaseProps } from '@src/components/PageBase';

const PasswordResetPage: FC = () => {
  const { callbackSave } = useMutationApp();
  const { showAlert } = useAppActions();

  const navigate = useNavigate();

  const onComplete = () => {
    showAlert('Новый пароль отправлен на Email.', 'success');
    navigate(RouteNames.LOGIN_PAGE);
  };

  const bindPageBase: PageBaseProps = {
    title: 'Сброс пароля',
    maxWidth: 'md',
    breadcrumbsOn: true,
    breadcrumbsHomeOn: false,
    breadcrumbsList: [{ title: 'Вход', to: RouteNames.LOGIN_PAGE }, { title: 'Сброс пароля' }],
  };

  return (
    <PageBase {...bindPageBase}>
      <PasswordResetForm
        callbackSave={callbackSave<PasswordResetDTO>({
          _id: '',
          typeName: TypeNameEnum.PASSWORD_RESET,
          onComplete,
        })}
      />
    </PageBase>
  );
};

export default PasswordResetPage;
