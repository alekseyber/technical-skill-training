import { FC } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';

export interface HtmlTextToReactProps {
  htmlText: string;
  component?: keyof JSX.IntrinsicElements;
  sx?: SxProps<Theme>;
}

const HtmlTextToReact: FC<HtmlTextToReactProps> = ({
  htmlText = '',
  component = 'div',
  sx = {},
}) => {
  if (!htmlText) return null;
  return (
    <Typography
      component={component}
      sx={sx}
      dangerouslySetInnerHTML={{
        __html: `${htmlText.trim()}`,
      }}
    ></Typography>
  );
};

export default HtmlTextToReact;
