import { Stack, Text, createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconEyePin } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

import Ip from '../../server/api/routers/Ip';
import { defineWidget } from '../helper';
import { IWidget } from '../widgets';

const definition = defineWidget({
  id: 'ip',
  icon: IconEyePin,
  options: {
    customTitle: {
      type: 'text',
      defaultValue: 'Your IP Address',
    },
  },
  gridstack: {
    minWidth: 1,
    minHeight: 1,
    maxWidth: 12,
    maxHeight: 12,
  },
  component: IpTile,
});

export type IIpWidget = IWidget<(typeof definition)['id'], typeof definition>;

interface IpTileProps {
  widget: IIpWidget;
}

function IpTile({ widget }: IpTileProps) {
  const { ref, width } = useElementSize();
  const { cx, classes } = useStyles();
  const { data: sessionData } = useSession();
  //   const [ipAddress, setIpAddress] = useState('Fetching...');

  //   useEffect(() => {

  //     axios.get('https://api.ipify.org?format=json')
  //       .then(response => {
  //         setIpAddress(response.data.ip);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching IP address:', error);
  //       });
  //   }, []);
  const ipAddress = Ip;

  return (
    <Stack ref={ref} className={cx(classes.wrapper, 'dashboard-tile-ip-wrapper')}>
      <Text
        size={width < 150 ? 'sm' : 'lg'}
        className={cx(classes.title, 'dashboard-tile-ip-title')}
      >
        {widget.properties.customTitle}
      </Text>
      <Text
        size={width < 150 ? 'sm' : 'lg'}
        className={cx(classes.ip, 'dashboard-tile-ip-address')}
      >
        {ipAddress()}
      </Text>
    </Stack>
  );
}

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 0,
  },
  title: {
    lineHeight: '1',
    whiteSpace: 'nowrap',
    fontWeight: 700,
    fontSize: '1.5rem',
  },
  ip: {
    lineHeight: '1',
    whiteSpace: 'nowrap',
    fontSize: '1.25rem',
  },
}));

export default definition;
