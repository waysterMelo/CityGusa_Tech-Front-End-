import React from "react";
import {Icon} from "@chakra-ui/react";
import { BsColumnsGap, BsCoin } from "react-icons/bs";
// Admin Imports
import forno from "views/admin/default";
import Custo from "views/admin/custo";
import {MdLock} from "react-icons/md";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={BsColumnsGap} width='20px' height='20px'/>,
    component: forno,
   },
  {
    name: "Planejamento",
    layout: "/admin",
    path: "/custo",
    icon: (
      <Icon
        as={BsCoin}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Custo,
    secondary: true,
  },

  //{
  //   name: "Test",
  //   layout: "/admin",
  //   path: "/custo",
  //   icon: (
  //       <Button
  //           as={BsCoin}
  //           width='20px'
  //           height='20px'
  //           color='inherit'
  //       />
  //   ),
  //   component: Custo,
  //   secondary: true,
  // },


  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  {
    name: "Logar",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit'/>,
    component: SignInCentered,
  }
];

export default routes;
