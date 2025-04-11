import {
    FaGlobe,
    FaEye,
    FaRegClock,
    FaFileAlt,
    FaArrowDown,
    FaArrowUp
  } from 'react-icons/fa';
  import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
  import classes from './StatsGrid.module.css';
  
  const icons = {
    websites: FaGlobe,
    pageViews: FaEye,
    pages: FaFileAlt,
    uptime: FaRegClock,
  };
  
  const data = [
    { title: 'Active Websites', icon: 'websites', value: '3', diff: 0, description: 'Total live websites' },
    { title: 'Total Pages', icon: 'pages', value: '12', diff: 4, description: 'Across all websites' },
    { title: 'Page Views', icon: 'pageViews', value: '1,245', diff: 28, description: 'Last 30 days' },
    { title: 'Usage', icon: 'uptime', value: '40%', diff: 0, description: 'Of your plan limit' },
  ] as const;
  
  export function QuickStatsGrid() {
    const stats = data.map((stat) => {
      const Icon = icons[stat.icon];
      const DiffIcon = stat.diff > 0 ? FaArrowUp : FaArrowDown;
  
      return (
        <Paper withBorder p="md" radius="md" key={stat.title}>
          <Group justify="space-between">
            <Text size="xs" c="dimmed" className={classes.title}>
              {stat.title}
            </Text>
            <Icon className={classes.icon} size={22} />
          </Group>
  
          <Group align="flex-end" gap="xs" mt={25}>
            <Text className={classes.value}>{stat.value}</Text>
            {stat.diff !== 0 && (
              <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
                <span>{stat.diff}%</span>
                <DiffIcon size={16} />
              </Text>
            )}
          </Group>
  
          <Text fz="xs" c="dimmed" mt={7}>
            {stat.description}
          </Text>
        </Paper>
      );
    });
    
    return (
      <div className={classes.root}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
      </div>
    );
  }