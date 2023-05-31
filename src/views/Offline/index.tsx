import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const OfflineContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '15vh',
  marginBottom: '1rem',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[1]
}));

const OfflineContent = styled('div')({
  textAlign: 'center',
});

const OfflineTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const OfflineMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
}));

const Offline = () => {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <OfflineContainer>
      <OfflineContent>
        <OfflineTitle variant="h4">
          You are offline
        </OfflineTitle>
        <OfflineMessage variant="body1">
          Pages that are stored in the cache will continue to work correctly, for the rest please connect to the Internet.
        </OfflineMessage>
      </OfflineContent>
    </OfflineContainer>
  );
};

export default Offline;