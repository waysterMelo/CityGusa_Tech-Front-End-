import React from "react";
import {Icon} from "@chakra-ui/react";
import {BsCoin} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Custo from "views/admin/custo";
import Home from "views/main";
import {MdLock} from "react-icons/md";
import SignInCentered from "views/auth/signIn";
import Dashboard from "views/admin/default";
import Forno from "./assets/img/icons/forno.png"
import IconBox from "./components/icons/IconBox";
import CadastroLeitoDeFusao from "./views/main/CadastroLeitoDeFusao";

const routes = [
    {
        name: "Dashboard",
        layout: "/admin",
        path: "/dashboard",
        icon: <Icon as={ RxDashboard } width='20px' height='20px'/>,
        component: Dashboard,
    },
    {
    name: "Forno",
    layout: "/admin",
    path: "/home",
    icon:  <IconBox
        w='20px'
        h='20px'
        img={
            <img
                src={Forno}
                alt='forno'
                style={{ width: "100%", height: "100%" }}
            />
        }
    />,
    component: Home,
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
  },
    {
        layout: "/admin",
        path: "/leito",
        component: CadastroLeitoDeFusao,
        name: null
    }
];

export default routes;
