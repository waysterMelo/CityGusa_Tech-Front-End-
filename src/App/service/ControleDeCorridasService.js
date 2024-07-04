import axios from 'axios';
import { format } from 'date-fns';

class ControleDeCorridasService {
    constructor() {
        // USE TO RETURN REGISTRY
        const today = format(new Date(), 'dd-MM-yyyy');

        //USE TO INSERT
        const todayInput = new Date().toISOString().split("T")[0];

        this.state = {
            today: today,
            todayInput: todayInput,
            formData: {
                data: todayInput,
                cacambas: "",
                horaAbertura: "",
                horaTampa: "",
                temperatura: "",
                reducao: "",
                reservaFundida: "",
                escoriaVisual: "",
                producao: "",
                producaoAcumulada: "",
                media: "",
                cecDiaM3: "",
                cecDiaKg: ""
            },
            corridas: [],
            mensagemErro: "",
            showSuccessModal: false,
            showErrorModal: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.state.formData = {
            ...this.state.formData,
            [name]: value
        };
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/runs/add", this.state.formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Corrida cadastrada com sucesso:", response.data);
            this.state.showSuccessModal = true;
            this.resetFormData();
            await this.fetchCorridas(this.state.today);  // Aguarde a busca de corridas
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
            this.state.mensagemErro = this.getErrorMessage(error);
            this.state.showErrorModal = true;
        }
    };

    fetchCorridas = async (data) => {
        try {
            const response = await axios.get(`http://localhost:8080/runs/date-today?data=${data}`);
            this.state.corridas = response.data;
        } catch (error) {
            console.error("Erro ao buscar corridas:", error);
        }
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

    resetFormData = () => {
        this.state.formData = {
            data: this.state.todayInput,
            cacambas: "",
            horaAbertura: "",
            horaTampa: "",
            temperatura: "",
            reducao: "",
            reservaFundida: "",
            escoriaVisual: "",
            producao: "",
            producaoAcumulada: "",
            media: "",
            cecDiaM3: "",
            cecDiaKg: ""
        };
    };

    handleClose = () => {
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };
}

export default ControleDeCorridasService;
