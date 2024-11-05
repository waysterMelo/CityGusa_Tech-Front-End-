import React from "react";
import {
    Box,
    Grid
} from "@chakra-ui/react";
import Banner from "../../components/banner/Banner";

const ControleOperacional = () => {
    // const service = useRef(new ControleOperacional()).current;
    // const [formData, setFormData] = useState(service.formData);
    // const [showSuccessModal, setShowSuccessModal] = useState(service.showSuccessModal);
    // const [showErrorModal, setShowErrorModal] = useState(service.showErrorModal);
    // const [mensagemErro, setMensagemErro] = useState(service.mensagemErro);


    // const resetFormData = () => {
    //     service.resetFormService();
    //     setFormData(service.formData);
    // }
    //
    // const handleChange = (e) => {
    //     service.handleChange(e, setFormData);
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const result = await service.salvar();
    //     setShowSuccessModal(service.showSuccessModal);
    //     setShowErrorModal(service.showErrorModal);
    //     setMensagemErro(service.mensagemErro);
    //     if (result.success) {
    //         setShowSuccessModal(true);
    //         resetFormData();
    //     } else {
    //         setShowErrorModal(true);
    //     }
    // };
    //
    // const handleClose = () => {
    //     service.handleClose(setShowSuccessModal, setShowErrorModal);
    // };


    return (
        <Box pt={{ base: "90px", md: "50px", xl: "5%" }} ml={{ base: "2%" }}>
            <Grid
                gridTemplateColumns={'repeat(1, 1fr)'}
                gap={{ base: "20px", xl: "20px" }}
                display={{ base: "block", xl: "grid" }}>
                <Banner url={'vazamento-cargas-fundidas'} url_voltar={'/admin/home'} texto_primario={'CONTROLE OPERACIONAL'}
                    texto_secundario={''}
                    primeiro_botao={''}
                    segundo_botao={''}
                    url_segundo_botao={'ver-analise-minerio-escoria'}
                        terceiro_botao={''}
                        url_terceiro_botao={'peso-gusa-consumo-carvao-sopradores'}
                />
            </Grid>

            <form onSubmit={''}>

            </form>


            {/*<Modal show={showSuccessModal} onHide={''}>*/}
            {/*    <Modal.Header className={'bg-success text-white'} closeButton>*/}
            {/*        <Modal.Title>Sucesso</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        Corrida cadastrada com sucesso!*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button className={'bg-primary text-white'} onClick={''}>*/}
            {/*            Fechar*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}

            {/*<Modal show={showErrorModal} onHide={''}>*/}
            {/*    <Modal.Header className={'bg-danger'} closeButton>*/}
            {/*        <Modal.Title>Erro</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        /!*{mensagemErro}*!/*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button className={'bg-dark text-white'} onClick={''}>*/}
            {/*            Fechar*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </Box>
    );
}

export default ControleOperacional;
