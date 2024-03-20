import React from "react";
import {Icon} from "@chakra-ui/react";
import { BsColumnsGap, BsCoin } from "react-icons/bs";
import Forno from "views/admin/default";
import Custo from "views/admin/custo";
import {MdLock} from "react-icons/md";
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Forno",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={BsColumnsGap} width='20px' height='20px'/>,
    component: Forno,
   },
  {
    name:"Planejamento",
    layout:"/admin",
    path: "/custo",
    icon: <Icon as={BsCoin} width='20px' height='20px' color='inherit' />,
    component: Custo,
    secondary: true,
  },
  {
    name: "Logar",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit'/>,
    component: SignInCentered,
  }
];

export default routes;
