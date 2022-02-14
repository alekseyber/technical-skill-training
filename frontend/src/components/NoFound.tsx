import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { RouteNames } from '@src/router/appRouterSettings';

const CssRootCard = styled(Card)`
  max-width: 450px;
  margin: 0 auto;
`;

const NoFound: FC = () => {
  return (
    <>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        sx={{
          my: 3,
          fontWeight: 700,
        }}
      >
        Страница не найдена
      </Typography>
      <CssRootCard>
        <CardMedia component="img" alt="Страница не найдена" image={'/images/404.png'} />
        <CardContent>
          <Typography variant="body1" component="p">
            Неправильно набран адрес, или такой страницы на сайте больше не существует.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="secondary"
            component={Link}
            to={RouteNames.MAIN_PAGE}
            variant="contained"
          >
            Вернитесь на главную
          </Button>
        </CardActions>
      </CssRootCard>
    </>
  );
};

export default NoFound;
