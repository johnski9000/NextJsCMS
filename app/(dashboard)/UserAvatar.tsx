import { Menu, Button, Avatar } from '@mantine/core';
import { FaSearch } from 'react-icons/fa';


export default function UserAvatar() {
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
  <Menu.Item>Profile Settings</Menu.Item>
  <Menu.Item>Subscription & Billing</Menu.Item>
  <Menu.Item>Password & Security</Menu.Item>
  
  <Menu.Divider />
  
  <Menu.Label>Help</Menu.Label>
  <Menu.Item>Documentation</Menu.Item>
  <Menu.Item>Support</Menu.Item>
  
  <Menu.Divider />
  
  <Menu.Item color="red">Sign Out</Menu.Item>
</Menu.Dropdown>
    </Menu>
  );
}