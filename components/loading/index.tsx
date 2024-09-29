import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { useAppSelector } from '@/store';

export default function LoadingCircularProgress(props: CircularProgressProps) {
  const isLoading = useAppSelector(
    (state) => state.loading.isFullScreenLoading,
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(15, 20, 25, 0.1)',
          zIndex: 10000,
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
  } else {
    return <></>;
  }
}
