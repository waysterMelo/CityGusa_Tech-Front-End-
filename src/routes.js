import React from "react";
import {Icon} from "@chakra-ui/react";
import Home from "views/main";
import SignInCentered from "./views/auth/signIn";
import Dashboard from "views/admin/default";
import AnaliseQuimicaDeMinerio from "./views/analises/AnaliseQuimicaDeMinerio";
import CadastroLeitoDeFusao from "./views/main/AlteracaoLeitoDeFusao";
import AnaliseGusa from "./views/analises/AnaliseGusa";
import AnaliseEscoria from "./views/analises/AnaliseEscoria";
import Pessoal from "./views/main/FrequenciaPessoal";
import Corrida from "./views/main/ControleDeCorridas/CadastrarCorrida";
import { FaAngleDoubleRight } from "react-icons/fa";
import Analises from "./views/analises/index";
import { FaBars } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import CorridasData from "./views/main/ControleDeCorridas/VerVazamentosCargasFundidas/index";
import ANQE from "./views/main/ControleDeCorridas/VerAnaliseMinerioEscoria/index";

const routes = [
    {
        name: "Dashboard",
        layout: "/admin",
        path: "/dashboard",
        icon: <Icon as={ FaBorderAll } width='20px' height='20px'/>,
        component: Dashboard,
    },
    {
    name: "Forno",
    layout: "/admin",
    path: "/home",
    icon: <Icon as={ FaClipboard } width={'20px'} height={'20px'} />,
    component: Home,
   },
    {
        name: "Análises",
        layout: "/admin",
        path: "/analises",
        icon: <Icon as={ FaBars } width={'20px'} height={'20px'} />,
        component: Analises,
    },
    {
        layout: "/admin",
        path: "/leito",
        component: CadastroLeitoDeFusao,
        icon:<Icon as={FaAngleDoubleRight} width='15px' height='15px' color='inherit' />,
        name: "Leito de Fusão",
        hidden: true
    },
    {
        layout: "/admin",
        path: "/analise-minerio",
        component: AnaliseQuimicaDeMinerio,
        name: 'Análise Minério',
        hidden: true
    },
    {
    layout: "/admin",
        path:"/analise-gusa",
        component:AnaliseGusa,
        name:"Análise Gusa",
        hidden: true
    },
    {
        layout: "/admin",
        path:"/analise-escoria",
        component: AnaliseEscoria,
        name:"Análise Escória",
        hidden: true
    },
    {
        layout: "/admin",
        path:"/pessoal",
        component: Pessoal,
        name:"",
        hidden: true
    },
    {
        layout: "/admin",
        path: "/controle-corrida",
        component:Corrida,
        name:"Controle das Corridas",
        hidden: true
    },
    {
        layout: "/admin",
        path: "/vazamento-cargas-fundidas",
        component: CorridasData,
        name: "Vazamento e cargas Fundidas",
        hidden: true
    },
    {
        layout: "/admin",
        path: "/analise-minerio-escoria",
        component: ANQE,
        name: "Análise Química de Minério e Escória",
        hidden: true
    },
    {
        name: "Logar",
        layout: "/auth",
        path: "/sign-in",
        icon: <Icon as={FaChalkboardTeacher} width='20px' height='20px' color='inherit'/>,
        component: SignInCentered,
    }
];

export default routes