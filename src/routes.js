import React from "react";
import {Icon} from "@chakra-ui/react";
import {BsCoin} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Custo from "views/admin/custo";
import Home from "views/main";
import {MdLock} from "react-icons/md";
import { BsBricks } from "react-icons/bs";
import SignInCentered from "views/auth/signIn";
import Dashboard from "views/admin/default";
import AnaliseQuimicaDeMinerio from "./views/main/AnaliseQuimicaDeMinerio";
import CadastroLeitoDeFusao from "./views/main/AlteracaoLeitoDeFusao";
import AnaliseGusa from "./views/main/AnaliseGusa";
import AnaliseEscoria from "./views/main/AnaliseEscoria";
import Pessoal from "./views/main/FrequenciaPessoal";
import Corrida from "./views/main/ControleDeCorridas/index";

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
    icon: <Icon as={ BsBricks } width={'20px'} height={'20px'} />,
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
        name: null,
    },
    {
        layout: "/admin",
        path: "/analise-minerio",
        component: AnaliseQuimicaDeMinerio,
        name: null,
    },
    {
    layout: "/admin",
        path:"/analise-gusa",
        component:AnaliseGusa,
        name:""
    },
    {
        layout: "/admin",
        path:"/analise-escoria",
        component: AnaliseEscoria,
        name:""
    },
    {
        layout: "/admin",
        path:"/pessoal",
        component: Pessoal,
        name:""
    },
    {
        layout: "/admin",
        path: "/controle-corrida",
        component:Corrida,
        name:null
    }
];

export default routes