import { FC } from 'react';
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import styled from '@emotion/styled';
import { ErrorFetchApp } from '@src/types';

export interface ErrorContentProps {
  error: ErrorFetchApp | null;
  refetchHangler?: () => void;
}

const CssRootDiv = styled('div')`
  width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CssBtnDiv = styled('div')`
  text-align: center;
`;

const ErrorContent: FC<ErrorContentProps> = ({ error, refetchHangler }) => {
  const onClickHandler = () => {
    if (refetchHangler) {
      refetchHangler();
    }
  };

  const errorText = error?.message || 'Проверьте интернет и попробуйте еще раз';

  return (
    <CssRootDiv>
      <div>
        <Card sx={{ maxWidth: 400, my: 2 }}>
          <CardMedia
            component="img"
            alt="Что-то пошло не так"
            sx={{ maxWidth: 200, margin: '0 auto' }}
            image="/images/ne-tak.png"
          />
          <CardContent>
            <Typography variant="h6" component="h2" align="center" gutterBottom>
              Ой, что-то пошло не так...
            </Typography>
            <Typography variant="body2" component="p" align="center">
              {errorText}
            </Typography>
            {refetchHangler && (
              <CssBtnDiv>
                <Button color="secondary" variant="contained" onClick={onClickHandler} sx={{ mt: 4 }}>
                  Повторить
                </Button>
              </CssBtnDiv>
            )}
          </CardContent>
        </Card>
      </div>
    </CssRootDiv>
  );
};

export default ErrorContent;
