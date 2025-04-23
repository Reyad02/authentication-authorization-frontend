"use client";
import { protectedRoutes } from "@/app/constant";
import { logout } from "@/services/authServices";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    logout();
    setAnchorEl(null);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  return (
    <div className="bg-[#182F59] text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <KeyboardCommandKeyIcon fontSize="large" />
        <div>
          <h1 className="text-lg font-semibold">TechForing</h1>
          <p className="text-sm">Shaping Tomorrows Cybersecurity</p>
        </div>
      </div>
      <div>
        <Avatar src="/broken-image.jpg" onClick={handleClick} />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
