"use client"
import React from 'react'
import { Grid, Paper, Group, Text, Button, Card, Badge, Image } from "@mantine/core";
import { FaPlus } from "react-icons/fa";



function WebsiteGrid() {
    const websites = [
        { id: 1, name: 'My First Website', status: 'published', pagesCount: 5, thumbnail: '/website1.png' },
        { id: 2, name: 'My Second Website', status: 'draft', pagesCount: 3, thumbnail: '/website2.png' },
        { id: 3, name: 'My Third Website', status: 'published', pagesCount: 10, thumbnail: '/website3.png' },
      ];
  return (
    <div className='py-4'>    <Grid>
    {websites.map(site => (
      <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={site.id}>
        <Card p="md" radius="md" withBorder>
          <Group position="apart" mb="xs">
            <Text weight={500}>{site.name}</Text>
            <Badge color={site.status === 'published' ? 'green' : 'orange'}>
              {site.status}
            </Badge>
          </Group>
          <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>
          <Group  mt="md">
            <Text size="sm" color="dimmed">{site.pagesCount} pages</Text>
            <Button  variant="light">Manage</Button>
          </Group>
        </Card>
      </Grid.Col>
    ))}
    <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
      <Paper p="md" radius="md" withBorder sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button leftSection={<FaPlus />} variant="outline">Create New Website</Button>
      </Paper>
    </Grid.Col>
  </Grid></div>
  )
}

export default WebsiteGrid