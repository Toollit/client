import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';

export default function LoadingCircularProgress(props: CircularProgressProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: '#4dd290',
          animationDuration: '550ms',
          position: 'absolute',
          // left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
