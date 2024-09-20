import React from "react";
import {Icon} from "@chakra-ui/react";
import Home from "views/main";
import SignInCentered from "./views/auth/signIn";
import Dashboard from "views/admin/default";
import CadastroLeitoDeFusao from "./views/main/AlteracaoLeitoDeFusao";
import AnaliseGusa from "./views/analises/CadastrarAnaliseGusa";
import AnaliseEscoria from "./views/analises/AnaliseEscoria";
import Pessoal from "./views/main/FrequenciaPessoal";
import Corrida from "./views/main/ControleDeCorridas/CadastrarCorrida";
import { FaAngleDoubleRight } from "react-icons/fa";
import CadastrarMinerios from "./views/analises/AnaliseQuimicaDeMinerio/CadastrarMinerio/index";
import { FaBars } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import CorridasData from "./views/main/ControleDeCorridas/VerVazamentosCargasFundidas/index";
import CANQE from "./views/analises/AnaliseQuimicaDeMinerio/index";
import PGCS from "./views/main/ControleDeCorridas/PesoGusaConsumoCarvao/index";
import VerAnaliseGusa from "./views/analises/VerAnaliseGusa";
import VerAnaliseQuimicaDeMinerio from "./views/analises/AnaliseQuimicaDeMinerio/VerAnalisesMinerio/index";
import VerAnaliseMinerioEscoria from "./views/main/ControleDeCorridas/VerAnaliseMinerioEscoria";

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
        layout: "/admin",
        path: "/leito",
        component: CadastroLeitoDeFusao,
        icon:<Icon as={FaAngleDoubleRight} width='15px' height='15px' color='inherit' />,
        name: "Leito de Fusão",
        hidden: true
    },
    {
        name: "Minérios",
        icon: <Icon as={FaBars} width='20px' height='20px' />,
        children: [ // Define os itens do dropdown
            {
                layout: "/admin",
                path: "/cadastrar-minerio",
                component: CadastrarMinerios,
                name: "Cadastrar Minérios",
            },
            {
                layout: "/admin",
                path: "/analise-minerio",
                component: CANQE,
                name: "Cadastrar Análise Minério",
            },
            {
                layout: "/admin",
                path: "/ver-analises-minerio",
                component: VerAnaliseQuimicaDeMinerio,
                name: "Pesquisar Análise",
            }
        ]
    },
    {
        //cadastrar minerios
        layout: "/admin",
        path: "/cadastrar-minerio",
        component: CadastrarMinerios,
        name: "Cadastrar Minérios",
        hidden: true
    },
    {
        //for dropdown
        layout: "/admin",
        path: "/ver-analises-minerio",
        component: VerAnaliseQuimicaDeMinerio,
        name: "Pesquisar Análise de Minério",
        hidden: true
    },
    {
        //for dropdown
        layout: "/admin",
        path: "/analise-escoria",
        component: AnaliseEscoria,
        name: "Análise de Escória",
        hidden: true
    },
    {
        //for dropdown
        layout: "/admin",
        path: "/analise-minerio",
        component: CANQE,
        name: "Cadastrar Análise Minério",
        hidden: true
    },

    {
        layout: "/admin",
        path:"/analise-gusa",
        component: AnaliseGusa,
        name:"Análise Gusa",
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
        path: "/ver-analise-minerio-escoria",
        component: VerAnaliseMinerioEscoria,
        name: "Análise Química de Minério e Escória",
        hidden: true
    },
    {
        name: "Logar",
        layout: "/auth",
        path: "/sign-in",
        icon: <Icon as={FaChalkboardTeacher} width='20px' height='20px' color='inherit'/>,
        component: SignInCentered,
    },
    {
        layout: "/admin",
        path: "/peso-gusa-consumo-carvao-sopradores",
        component: PGCS,
        name: "Peso Gusa e Temperatura, Consumo Carvão, Sopradores",
        hidden: true
    },
    {
        layout: "/admin",
        path: "/ver-analises-gusa",
        component: VerAnaliseGusa,
        name: "Ver Análise Gusa",
        hidden: true
    }


];



export default routes