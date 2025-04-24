"use client";
import { protectedRoutes } from "@/constant";
import { logout } from "@/services/authServices";
import { getToken } from "@/services/jobsServices";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      const redirectPath = encodeURIComponent(pathname);
      router.push(`/login?redirectPath=${redirectPath}`);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getLoggedInUser = async () => {
      const getUser = await getToken();
      if (getUser) {
        setLoggedInUser(true);
      } else {
        setLoggedInUser(false);
      }
    };

    getLoggedInUser();
  }, [pathname]);
  return (
    <div className="bg-[#182F59] text-white px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <KeyboardCommandKeyIcon fontSize="large" />
        <div>
          <h1 className="text-xl font-semibold">TechForing</h1>
          <p className="text-sm">Shaping Tomorrows Cybersecurity</p>
        </div>
      </div>
      {loggedInUser ? (
        <div>
          <Avatar src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg" onClick={handleClick} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href={"/"}>Available Jobs</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <Link href={"/create-jobs"}>Create Job</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
