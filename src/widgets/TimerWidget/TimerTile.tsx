import { Stack, Text, createStyles } from '@mantine/core';
import { useElementSize, useSetState } from '@mantine/hooks';
import { Icon24Hours } from '@tabler/icons-react';
import { useEffect } from 'react';

import { defineWidget } from '../helper';
import { IWidget } from '../widgets';

const definition = defineWidget({
  id: 'timer',
  icon: Icon24Hours,
  options: {
    customTitle: {
      type: 'text',
      defaultValue: 'Count Down',
    },
    customAlarmTime: {
      type: 'text',
      defaultValue: '23:59:59'
    }
  },
  gridstack: {
    minWidth: 1,
    minHeight: 1,
    maxWidth: 12,
    maxHeight: 12,
  },
  component: TimerTile,
});

export type ITimer = IWidget<(typeof definition)['id'], typeof definition>;

interface TimerTileProps {
  widget: ITimer;
}

function TimerTile({ widget }: TimerTileProps) {
  const [state, setState] = useSetState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { ref, width } = useElementSize();
  const { cx, classes } = useStyles();

  useEffect(() => {
    const target = new Date('05/01/2024 ' + widget.properties.customAlarmTime);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const hoursDifference = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setState({ hours: hoursDifference });

      const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setState({ minutes: minutesDifference });

      const secondsDifference = Math.floor((difference % (1000 * 60)) / 1000);
      setState({ seconds: secondsDifference });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack ref={ref} className={cx(classes.wrapper, 'dashboard-tile-timer-wrapper')}>
      <Text
        size={width < 150 ? 'sm' : 'lg'}
        className={cx(classes.title, 'dashboard-tile-timer-title')}
      >
        {' '}
        {widget.properties.customTitle}{' '}
      </Text>
      <Text
        size={width < 150 ? 'sm' : 'lg'}
        className={cx(classes.time, 'dashboard-tile-timer-countDown')}
      >
        {state.hours + ': ' + state.minutes + ': ' + state.seconds}
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
  time: {
    lineHeight: '1',
    whiteSpace: 'nowrap',
    fontSize: '1.25rem',
  },
}));

export default definition;
