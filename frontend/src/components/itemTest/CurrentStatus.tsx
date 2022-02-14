import { FC } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

interface CurrentStatusProps {
  current: number;
  questionsLength: number;
}

const CurrentStatus: FC<CurrentStatusProps> = ({ current, questionsLength }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Stepper
        activeStep={current}
        sx={{ flexWrap: 'wrap', '& .MuiStepConnector-root': { display: 'none' } }}
      >
        {new Array(questionsLength).fill(1).map((_, index) => {
          return (
            <Step key={index} sx={{ my: 1, px: 0 }}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default CurrentStatus;
