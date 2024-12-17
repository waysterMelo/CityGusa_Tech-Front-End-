import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axios from "axios";
dayjs.extend(duration);

class ControleOperacionalService {
    constructor() {
        this.formData = {
            createdAt:'',
            horas:'',
            a:'',
            gaiola:'',
            cargaHora:'',
            cargaSeca:'',
            vazao:'',
            pressaoCoroa:'',
            pressaoTopo:'',
            temperaturaCoroa:'',
            temperaturaTopo:'',
            sonda:'',
            densidadeKg:'',
            umidade:'',
            gusaKg:'',
            acumuladoKilos:'',
            densidadeMedia:'',
            densidadeMediaTotal:'',
            umidadeMedia:'',
            umidadeMediaTotal:'',


            acumuladoCarga:'',
            acumuladoCargaSeca:'',
            mediaHoraCarga:'',
            rt:'',

        };
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false;
    }

    resetFormData=()=> {
        this.formData = {
            a:'',
            gaiola:'',
            cargaHora:'',
            cargaSeca:'',
            vazao:'',
            pressaoCoroa:'',
            pressaoTopo:'',
            temperaturaCoroa:'',
            temperaturaTopo:'',
            sonda:'',
            densidadeKg:'',
            umidade:'',
            gusaKg:'',
            acumuladoKilos:''
        }
    }

    handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        this.formData = {
            ...this.formData,
            [name]: value
        };
        setFormData(this.formData);
    };

    getErrorMessage = (error) => {
        let mensagemErro = "";
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400 && data.message.includes('Cannot deserialize value of type')) {
                mensagemErro = `Erro ${status}: Há um problema nos dados enviados. Verifique se todos os campos estão preenchidos corretamente e se os valores numéricos estão no formato adequado.`;
            } else {
                mensagemErro = `Erro ${status}: ${data.message || error.message}`;
            }
        } else {
            mensagemErro = `Erro: ${error.message}`;
        }
        return mensagemErro;
    };

    salvar = async () => {
        try {
            const response = await axios.post("http://localhost:8080/operacional", this.formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Registro inserido com sucesso:", response.data);
            this.showSuccessModal = true;
            return { success: true };
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return { success: false, message: error.message };
        }
    };

    handleClose = (setShowSuccessModal, setShowErrorModal, setShowNullModal) => {
        if (setShowSuccessModal) setShowSuccessModal(false);
        if (setShowErrorModal) setShowErrorModal(false);
        if (setShowNullModal) setShowNullModal(false);
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false
    };

    async getOperacionalDoDia() {
        try {
            const response = await axios.get("http://localhost:8080/operacional/today");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar informações do dia:", error);
            return [];
        }
    }

    async getOperacionalPorData(date) {
        try {
            const response = await axios.get(`http://localhost:8080/operacional/por-data?data=${date}`);

            if (response.data.length === 0) {
                this.mensagemErro = "Não há informações cadastradas nessa data.";
                this.showErrorModal = true;
                return { success: false, message: "Nenhum dado encontrado." };
            }
            this.showSuccessModal = true;
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Erro ao buscar corridas:", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return { success: false, message: error.message };
        }
    }

}

export default ControleOperacionalService;
