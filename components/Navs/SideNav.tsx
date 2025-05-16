import { Button, ButtonGroup } from "flowbite-react";
import { HiOutlineHome, HiBookOpen } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { TbLifebuoyFilled } from "react-icons/tb";

const SideNav = () => {
  return (
    <div className="side_nav_container">
      <div className="main_side_menu_wrapper">
        <button className="btn active_btn mx-auto mb-6 flex items-center">
          <span className="flex w-full items-center">
            <HiOutlineHome className="mr-2" />
            Dashboard
          </span>
          <IoIosArrowUp />
        </button>
      </div>
      <div className="flex w-full flex-col gap-4">
        <button className="btn mx-auto flex items-center">
          <HiBookOpen className="mr-2" />
          FAQs
        </button>
        <button className="btn mx-auto flex items-center">
          <TbLifebuoyFilled className="mr-2" />
          Help
        </button>
      </div>
    </div>
  );
};

export default SideNav;
