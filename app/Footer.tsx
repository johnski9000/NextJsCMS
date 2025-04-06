import {
  FaFacebook,
  FaInstagram,
  FaQuestion,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Checkbox,
  Button,
  Anchor,
} from "@mantine/core";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="pt-8 pb-7 bg-black bg-opacity-85">
      <Container size="xl" px="md">
        {/* Logo and Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-gray-500 gap-8">
          <Anchor href="https://pagedone.io/" underline={false}>
            <img
              src="/mobileLogo.png"
              alt="Pagedone logo"
              width={50}
              height={50}
              className="object-contain mb-5 sm:mb-0" // Invert colors for dark theme
            />
          </Anchor>

          <Group spacing="sm">
            <Anchor
              href="#"
              className="p-3 rounded-full bg-white text-gray-700 group transition-all duration-500 hover:bg-amber-500 hover:text-white focus-within:outline-0 focus-within:bg-amber-500 focus-within:text-white"
            >
              <FaFacebook size={20} className="text-white" />
            </Anchor>
            <Anchor
              href="#"
              className="p-3 rounded-full bg-white text-white group transition-all duration-500 hover:bg-amber-500 hover:text-white focus-within:outline-0 focus-within:bg-amber-500 focus-within:text-white"
            >
              <FaInstagram size={20} className="text-white" />
            </Anchor>
            <Anchor
              href="#"
              className="p-3 rounded-full bg-white text-gray-700 group transition-all duration-500 hover:bg-amber-500 hover:text-white focus-within:outline-0 focus-within:bg-amber-500 focus-within:text-white"
            >
              <FaTwitter size={20} className="text-white" />
            </Anchor>
            <Anchor
              href="#"
              className="p-3 rounded-full bg-white text-gray-700 group transition-all duration-500 hover:bg-amber-500 hover:text-white focus-within:outline-0 focus-within:bg-amber-500 focus-within:text-white"
            >
              <FaYoutube size={20} className="text-white" />
            </Anchor>
          </Group>
        </div>

        {/* Footer Links and Newsletter */}
        <div className="py-14 flex flex-col lg:flex-row justify-between gap-8 border-b border-gray-500">
          <div className="w-full max-lg:mx-auto flex flex-col sm:flex-row max-lg:items-center max-lg:justify-between gap-6 md:gap-12 lg:gap-24">
            <Stack spacing="md">
              <Text
                weight={500}
                size="lg"
                color="white"
                className="max-lg:text-center"
              >
                Pagedone
              </Text>
              <Stack spacing="sm">
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Home
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  About
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Pricing
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Pro Version
                </Anchor>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <Text
                weight={500}
                size="lg"
                color="white"
                className="max-lg:text-center"
              >
                Products
              </Text>
              <Stack spacing="sm">
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Figma UI System
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Icons Assets
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Responsive Blocks
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Components Library
                </Anchor>
              </Stack>
            </Stack>

            <Stack spacing="md">
              <Text
                weight={500}
                size="lg"
                className="max-lg:text-center !text-white"
              >
                Resources
              </Text>
              <Stack spacing="sm">
                <Anchor
                  href="#"
                  className="transition-all !text-gray-400 duration-300 hover:text-amber-400 focus-within:text-amber-400"
                >
                  FAQs
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Quick Start
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  Documentation
                </Anchor>
                <Anchor
                  href="#"
                  color="gray.4"
                  className="transition-all duration-300 !text-gray-400 hover:text-amber-400 focus-within:text-amber-400"
                >
                  User Guide
                </Anchor>
              </Stack>
            </Stack>
          </div>

          <div className="w-full lg:max-w-md max-lg:mx-auto">
            <Text weight={500} size="lg" color="white" mb="md">
              Newsletter
            </Text>
            <div className="bg-gray-800 rounded-3xl p-5">
              <Stack>
                <TextInput
                  placeholder="harsh@pagedone.com"
                  label="Email"
                  required
                  classNames={{
                    input:
                      "bg-transparent border-gray-400 text-white placeholder-gray-400 focus:border-gray-300",
                    label: "text-gray-400",
                  }}
                />

                <Group position="apart">
                  <Checkbox
                    label={
                      <Text size="sm" color="gray.4">
                        I agree with{" "}
                        <Anchor href="#" color="amber.5">
                          Privacy Policy
                        </Anchor>{" "}
                        and{" "}
                        <Anchor href="#" color="amber.5">
                          Terms of Condition
                        </Anchor>
                      </Text>
                    }
                    defaultChecked
                    classNames={{
                      input:
                        "bg-gray-800 border-gray-600 hover:border-gray-400 hover:bg-gray-900 checked:bg-gray-800 checked:border-gray-400",
                    }}
                  />
                  <Button
                    color="amber.5"
                    className="hover:bg-white hover:text-gray-900"
                  >
                    Send
                  </Button>
                </Group>
              </Stack>
            </div>
          </div>
        </div>

        {/* Copyright and Contact */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-5 pt-7">
          <Text size="sm" color="gray.4">
            <Anchor href="https://pagedone.io/" underline={false}>
              ©pagedone
            </Anchor>{" "}
            2023, All rights reserved.
          </Text>

          <div className="relative text-gray-500 focus-within:text-gray-900">
            <div className="absolute inset-y-0 right-6 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                {/* SVG path remains the same */}
              </svg>
            </div>
            <Button
              variant="outline"
              color="gray"
              className="w-full lg:min-w-[448px] pr-12 pl-6 py-3 text-gray-50 border-gray-700 hover:bg-transparent hover:text-gray-50"
              rightSection={<FaQuestion className="text-gray-50" size={10} />}
            >
              Have a question? talk to us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
