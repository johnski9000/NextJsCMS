import { signOut } from "@/lib/supabase/auth";
import { Menu, Avatar, Button, Text } from "@mantine/core";
import Link from "next/link";
import {
  FaUser,
  FaCreditCard,
  FaLock,
  FaBook,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserAvatar() {
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to login page or show a success message
      window.location.href = "/login"; // Adjust the redirect URL as needed
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <Menu>
      <Menu.Target>
        <Avatar
          radius="xl"
          size={40}
          src="https://i.pravatar.cc/300"
          alt="User Avatar"
          className="cursor-pointer"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item>
          <Link href="/dashboard/profile" className="flex items-center gap-2">
            <FaUser className="text-gray-600" />
            Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/billing" className="flex items-center gap-2">
            <FaCreditCard className="text-gray-600" />
            Subscription & Billing
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/dashboard/security" className="flex items-center gap-2">
            <FaLock className="text-gray-600" />
            Password & Security
          </Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Help</Menu.Label>
        <Menu.Item>
          <Link href="/documentation" className="flex items-center gap-2">
            <FaBook className="text-gray-600" />
            Documentation
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/support" className="flex items-center gap-2">
            <FaHeadset className="text-gray-600" />
            Support
          </Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={() => handleSignOut()} color="red">
          <div className="!flex items-center justify-start">
            <FaSignOutAlt className="text-red-500 mr-2" />
            <Text size="sm">Sign Out</Text>
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
