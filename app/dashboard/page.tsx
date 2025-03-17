"use client";

import { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";

import {
  Container,
  Grid,
  Card,
  Button,
  Text,
  Title,
  Skeleton,
} from "@mantine/core";
import { FaPlus, FaGlobe, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

export default function MyWebsitesDashboard() {
  const [session, setSession] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const sessionData = {};
      setSession(sessionData);

      // Simulate fetching websites from Supabase
      setTimeout(() => {
        setWebsites([
          {
            id: 1,
            name: "JW Digital",
            domain: "jwdigital.co.uk",
            status: "Active",
          },
          {
            id: 2,
            name: "Muscle Manor",
            domain: "musclemanor.com",
            status: "Pending",
          },
        ]);
        setLoading(false);
      }, 1500);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container size="lg" className="py-8">
        <Title order={2} className="text-black">
          My Websites
        </Title>
        <Text size="sm" color="dimmed">
          Manage your websites, view their status, and add new ones.
        </Text>

        {/* Website Grid */}
        <Grid gutter="lg" className="mt-6">
          {/* Add New Website Card */}
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card
              shadow="md"
              padding="lg"
              radius="md"
              className="border border-dashed border-gray-400 min-h-[208px] flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <FaPlus className="text-gray-500 w-10 h-10 mb-3" />
                <Text size="sm" color="dimmed">
                  Add a new website
                </Text>
                <Button variant="outline" color="orange" mt="md">
                  Add Website
                </Button>
              </div>
            </Card>
          </Grid.Col>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Grid.Col key={index} md={6} lg={4}>
                  <Skeleton height={150} radius="md" />
                </Grid.Col>
              ))
            : websites.map((website) => (
                <Grid.Col key={website.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <Card
                    shadow="md"
                    padding="lg"
                    radius="md"
                    className="border border-gray-300 flex items-center justify-center"
                  >
                    <FaGlobe className="text-orange-500 w-8 h-8 mb-4" />
                    <Title order={4}>{website.name}</Title>
                    <Text size="sm" color="dimmed">
                      {website.domain}
                    </Text>
                    <Text
                      size="sm"
                      className={`font-semibold ${
                        website.status === "Active"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {website.status}
                    </Text>
                    <div className="mt-4 flex justify-between items-center">
                      <Link href={`https://${website.domain}`} target="_blank">
                        <Button
                          variant="light"
                          leftSection={<FaExternalLinkAlt />}
                        >
                          Visit
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </Grid.Col>
              ))}
        </Grid>
      </Container>
    </div>
  );
}
