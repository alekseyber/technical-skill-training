import { ChangeEvent, MouseEvent, FC, useState, useEffect } from 'react';
import { Box, CircularProgress, Switch, SxProps, Theme } from '@mui/material';

interface SwitchEditProps<V = boolean> {
  dataInput: V;
  callbackSaveField: (value: V) => Promise<void>;
  sx?: SxProps<Theme>;
}

const SwitchEdit: FC<SwitchEditProps> = ({ callbackSaveField, dataInput, sx }) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(Boolean(dataInput));
  const [on, setOn] = useState(true);

  useEffect(() => {
    return () => {
      setOn(false);
    };
  }, []);
  const handleStopPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation();
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const checked = event.target.checked;
      setLoading(true);
      await callbackSaveField(checked);
      setChecked(checked);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  if (!on) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 58 }}>
      {loading ? (
        <CircularProgress size={38} />
      ) : (
        <Switch checked={checked} onChange={handleChange} sx={sx} onClick={handleStopPropagation} />
      )}
    </Box>
  );
};

export default SwitchEdit;
