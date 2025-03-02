import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Button } from "@heroui/react";
import { Link, usePage } from "@inertiajs/react";
import LogoutIcon from "./Icons/LogoutIcon";

export default function ProfileDropDown() {

    const { auth } = usePage().props;
    const userRoles = auth?.user?.roles || []; // Get roles

    const isAdmin = userRoles.some(role => role.name === 'admin') || userRoles.some(role => role.name === 'agent');

    return (
        <div className="flex items-center gap-4">
            {/* <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}

            <Dropdown placement="bottom-start">
                <DropdownTrigger>

                    <User
                        // as=""
                        avatarProps={{
                            isBordered: true,
                            src: auth.user?.user_img ? `${auth.user.user_img}` : "/upload/users/672452cb5f88e.png",
                        }}
                        className="transition-transform cursor-pointer"
                        name={<span className="hidden md:block">{auth.user?.name.length > 8 ? auth.user.name.substring(0, 7) + ' ...' : auth.user.name}</span>}
                    />

                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">{auth.user.email}</p>
                    </DropdownItem>

                    {isAdmin && <DropdownItem key="dashboard" className="!p-0">
                        <Link className="block py-1.5 px-2" href={route('admin.cpanel')}>
                            Dashboard
                        </Link>
                    </DropdownItem>}

                    <DropdownItem key="settings" className="!p-0">

                        <Link className="block py-1.5 px-2" href={route('profile.edit')}>
                            Profile
                        </Link>
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        <Link
                            href={route('logout')}
                            method="post"
                            className="flex"
                        >

                            <LogoutIcon width={'1.3em'} height={'1.3em'} />
                            <span>Logout</span>
                        </Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
