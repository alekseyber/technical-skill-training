import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import { RouteNames } from '@src/router/appRouterSettings';

const AccessIsDenied: FC = () => {
  return (
    <Card sx={{ maxWidth: 300, margin: '0 auto' }}>
      <CardMedia component="img" height="210" image="/images/rabbit.png" alt="AccessIsDenied" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          К сожалению Вам отказано в доступе
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Для получения доступа обратитесь к администратору
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={RouteNames.MAIN_PAGE}>
          На главную
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccessIsDenied;
