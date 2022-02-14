import { FC, useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface AppTimerProps {
  timerValue: number;
  timerEndHangler?: () => void;
  complete?: boolean;
}

function getTimeFromMins(mins: number): string {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  const minutesPrefix = minutes < 10 ? '0' : '';
  return hours + ':' + minutesPrefix + minutes;
}

const AppTimer: FC<AppTimerProps> = ({ timerValue, timerEndHangler, complete = false }) => {
  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      if (minutes > 0) {
        setTimeout(() => setMinutes(minutes - 1), 1000 * 60);
      } else {
        setStart(false);
        if (timerEndHangler) {
          timerEndHangler();
        }
      }
    }
  }, [minutes, start, timerEndHangler]);

  useEffect(() => {
    if (complete) {
      setStart(false);
    }
  }, [complete]);

  useEffect(() => {
    if (timerValue) {
      setMinutes(timerValue);
      setStart(true);
    }
    return () => {
      setStart(false);
    };
  }, [timerValue]);

  if (!timerValue) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > .MuiTypography-root': { ml: 1 },
        border: '0.5px solid #ccc',
        padding: '1px 5px',
      }}
    >
      <AccessTimeIcon />
      <Typography variant="h6" component="div">
        {getTimeFromMins(minutes)}
      </Typography>
    </Box>
  );
};

export default AppTimer;
