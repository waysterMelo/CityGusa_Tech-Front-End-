import React, { useRef, useState } from "react";
import {
  Box, 
  Button, 
  Flex, 
  Grid, 
  HStack, 
  Text,
  VStack,
  Icon,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { 
  FaIndustry, 
  FaTemperatureHigh, 
  FaWater, 
  FaWeightHanging, 
  FaChartLine, 
  FaCloud, 
  FaFire, 
  FaClipboardList, 
  FaSave,
  FaExclamationTriangle
} from "react-icons/fa";
import Banner from "../../components/banner/Banner";
import InputMask from "react-input-mask";
import ControleOperacionalService from "../../App/OperacionalService/ControleOperacionalService";
import 'bootstrap/dist/css/bootstrap.min.css';

const ControleOperacional = () => {
  // Instanciamos o service só para chamar o salvar().
  const service = useRef(new ControleOperacionalService()).current;

  const [formData, setFormData] = useState({
    id: '',
    createdAt: '',
    horas: '',
    a: '',
    gaiola: '',
    cargaHora: '',
    cargaSeca: '',
    vazao: '',
    pressaoCoroa: '',
    pressaoTopo: '',
    temperaturaCoroa: '',
    temperaturaTopo: '',
    sonda: '',
    densidadeKg: '',
    umidade: '',
    gusaKg: '',
    acumuladoKilos: '',
    densidadeMedia: '',
    densidadeMediaTotal: '',
    umidadeMedia: '',
    umidadeMediaTotal: '',
    fatorBaseDensidadeSeca: '',
    pesoCarvaoCalc: '',
    acumuladoCarga: '',
    acumuladoCargaSeca: '',
    mediaHoraCarga: '',
    rt: '',
    carvaoEnfornado: '',
    carvaoEnfornadoMedia: '',
    consumoKg: '',
    consumoMetros: '',
    positivoNegativo: ''
  });

  // Estados para abrir/fechar Modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  // Função de reset do formData no frontend
  const resetFormData = () => {
    setFormData({
      id: '',
      createdAt: '',
      horas: '',
      a: '',
      gaiola: '',
      cargaHora: '',
      cargaSeca: '',
      vazao: '',
      pressaoCoroa: '',
      pressaoTopo: '',
      temperaturaCoroa: '',
      temperaturaTopo: '',
      sonda: '',
      densidadeKg: '',
      umidade: '',
      gusaKg: '',
      acumuladoKilos: '',
      densidadeMedia: '',
      densidadeMediaTotal: '',
      umidadeMedia: '',
      umidadeMediaTotal: '',
      fatorBaseDensidadeSeca: '',
      pesoCarvaoCalc: '',
      acumuladoCarga: '',
      acumuladoCargaSeca: '',
      mediaHoraCarga: '',
      rt: '',
      carvaoEnfornado: '',
      carvaoEnfornadoMedia: '',
      consumoKg: '',
      consumoMetros: '',
      positivoNegativo: ''
    });
  };

  // Ao enviar o form, chamamos service.salvar() passando formData
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await service.salvar(formData);
    if (result.success) {
      setShowSuccessModal(true);
      resetFormData();
    } else {
      setShowErrorModal(true);
      setMensagemErro(result.message || 'Ocorreu um erro ao salvar os dados.');
    }
  };

  // handleChange local (não precisa do service)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fecha os modals
  const handleClose = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setMensagemErro("");
  };

  return (
    <ChakraProvider>
      <Box 
        pt={{ base: "90px", md: "50px", xl: "5%" }} 
        ml={{ base: "2%" }} 
        maxWidth="container.xl" 
        mx="auto"
        bg="brand.50"
        minHeight="100vh"
        p={4}
      >
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={4}
          display={{ base: "block", xl: "grid" }}
        >
          <Banner 
            url_voltar={'/admin/home'} 
            texto_primario={'CONTROLE OPERACIONAL'}
            texto_secundario={'Abaixo confira as informações inseridas'}
            primeiro_botao={'CARGAS | PRESSÃO | TEMPERATURA | SONDA'}
            url={'cargas-pressao-temperatura-sonda'}
            primeiro_botao_texto_secundario={'RITMO, MÉDIAS DA UMIDADE E DENSIDADE, MÉDIA HORA'}
            segundo_botao={'CONTROLE CARVÃO'} 
            segundo_botao_texto_secundario={'PESO CALCULADO | PESO ENFORNADO | MÉDIA | CONSUMO'} 
            url_segundo_botao={'controle-carvao'}
            terceiro_botao={'RESERVAS'}
            terceiro_botao_texto_secundario={'PONTO | ENF | FUND | +/- | COLUNA'}
            url_terceiro_botao={'reservas'}
          />
        </Grid>

        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-4">
            {/* Operacional */}
            <div className="card mb-4 w-100 border border-black border-2 shadow-sm">
              <div className="card-header bg-light d-flex align-items-center">
                <FaIndustry className="text-black me-2" size={20} />
                <span className="fw-bold text-black">Operacional</span>
              </div>
              <div className="card-body">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label d-flex align-items-center">
                        <FaChartLine className="text-black me-2" /> A
                      </label>
                      <input 
                        type="text"
                        className="form-control text-center border-black-subtle"
                        placeholder="Digite aqui..." 
                        name="a" 
                        value={formData.a} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label d-flex align-items-center">
                        <FaWeightHanging className="text-black me-2" /> Gaiola
                      </label>
                      <input 
                        type="text"
                        className="form-control text-center border-black"
                        placeholder="gaiola" 
                        name="gaiola" 
                        value={formData.gaiola} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label d-flex align-items-center">
                        <FaFire className="text-black me-2" /> Carga/Seca
                      </label>
                      <input 
                        type="text"
                        className="form-control text-center border-black"
                        placeholder="carga seca" 
                        name="cargaSeca" 
                        value={formData.cargaSeca} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label d-flex align-items-center">
                        <FaFire className="text-black me-2" /> Carga/Hora
                      </label>
                      <input 
                        type="text"
                        className="form-control text-center border-black"
                        placeholder="carga hora" 
                        name="cargaHora" 
                        value={formData.cargaHora} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="form-label d-flex align-items-center">
                        <FaCloud className="text-black me-2" /> Vazão
                      </label>
                      <input 
                        type="text"
                        className="form-control border-black"
                        placeholder="vazão" 
                        name="vazao" 
                        value={formData.vazao} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pressão, Temperatura e Sonda */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaWater className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Pressão</span>
                  </div>
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="form-group flex-grow-1">
                        <label className="form-label">Coroa</label>
                        <InputMask
                          mask={'9.99'}
                          maskChar=""
                          value={formData.pressaoCoroa}
                          onChange={handleChange}
                          placeholder={'0.00'}
                          name={'pressaoCoroa'}
                          className="form-control border-black-subtle"
                        />
                      </div>
                      <div className="form-group flex-grow-1">
                        <label className="form-label">Topo</label>
                        <input 
                          type="text"
                          className="form-control border-black-subtle"
                          placeholder="00" 
                          name="pressaoTopo" 
                          value={formData.pressaoTopo} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaTemperatureHigh className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Temperatura</span>
                  </div>
                  <div className="card-body">
                    <div className="d-flex gap-3">
                      <div className="form-group flex-grow-1">
                        <label className="form-label">Coroa</label>
                        <input 
                          type="text"
                          className="form-control border-black-subtle"
                          placeholder="000" 
                          name="temperaturaCoroa" 
                          value={formData.temperaturaCoroa} 
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group flex-grow-1">
                        <label className="form-label">Topo</label>
                        <input 
                          type="text"
                          className="form-control border-black-subtle"
                          placeholder="0.00" 
                          name="temperaturaTopo" 
                          value={formData.temperaturaTopo} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaCloud className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Sonda</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Digite</label>
                      <input 
                        type="text"
                        className="form-control border-black-subtle"
                        placeholder="00" 
                        name="sonda" 
                        value={formData.sonda} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Densidade, Umidade, Gusa/C, etc */}
            <div className="row row-cols-1 row-cols-md-5 g-4">
              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaWeightHanging className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Densidade</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">KG/M³</label>
                      <input 
                        type="text"
                        className="form-control border-black-subtle"
                        placeholder="000" 
                        name="densidadeKg" 
                        value={formData.densidadeKg} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaCloud className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Umidade</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">%</label>
                      <input 
                        type="number"
                        className="form-control border-black-subtle"
                        placeholder="%" 
                        name="umidade" 
                        value={formData.umidade} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaFire className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Gusa/C</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Kg</label>
                      <input 
                        type="text"
                        className="form-control border-black-subtle"
                        placeholder="0000" 
                        name="gusaKg" 
                        value={formData.gusaKg} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaWeightHanging className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Carvão</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Acum/Kilos</label>
                      <input 
                        type="text"
                        className="form-control border-black-subtle"
                        placeholder="0000" 
                        name="acumuladoKilos" 
                        value={formData.acumuladoKilos} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card w-100 border border-black border-2 shadow-sm">
                  <div className="card-header bg-light d-flex align-items-center">
                    <FaChartLine className="text-black me-2" size={20} />
                    <span className="fw-bold text-black">Fator Base</span>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Dens/Seca</label>
                      <input 
                        type="text"
                        className="form-control border-black-subtle"
                        placeholder="000" 
                        name="fatorBaseDensidadeSeca" 
                        value={formData.fatorBaseDensidadeSeca} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão de Registro */}
            <Flex justifyContent="flex-end" mt={4}>
              <Button 
                leftIcon={<FaSave />}
                colorScheme="green" 
                size="lg" 
                type="submit" 
                width={{ base: "full", md: "auto" }}
              >
                Registrar
              </Button>
            </Flex>
          </div>
        </form>

        {/* Modal de Sucesso */}
        <Modal isOpen={showSuccessModal} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="brand.50">
            <ModalHeader 
              bg="green.500" 
              color="white" 
              display="flex" 
              alignItems="center"
            >
              <Icon as={FaClipboardList} mr={3} />
              Sucesso
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              Informações cadastradas com sucesso!
            </ModalBody>
            <ModalFooter>
              <Button 
                colorScheme="green" 
                onClick={handleClose}
              >
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de Erro */}
        <Modal isOpen={showErrorModal} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="brand.50">
            <ModalHeader 
              bg="red.500" 
              color="white" 
              display="flex" 
              alignItems="center"
            >
              <Icon as={FaExclamationTriangle} mr={3} />
              Erro
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              {mensagemErro}
            </ModalBody>
            <ModalFooter>
              <Button 
                colorScheme="red" 
                onClick={handleClose}
              >
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default ControleOperacional;