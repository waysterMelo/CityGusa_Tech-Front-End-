import axios from "axios";
import { format } from "date-fns";

class CargasLeitoFusaoService {
    constructor() {
        const today = format(new Date(), "dd-MM-yyyy");
        this.state = {
            today: today,
            formData: {
                data_atual: today,
                horas: "",
                numeroDaCarga: "",
                porcentagem: "",
                minerio: "",
                quantidade: "",
                calcareo: "",
                bauxita: "",
                coque: "",
                secas: "",
                sucataGusa: "",
                sucataAco: "",
                totalCargas: ""
            },
            results: [],
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
            const response = await axios.post("http://localhost:8080/leito-fusao", this.state.formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Registro inserido com sucesso:", response.data);
            this.state.showSuccessModal = true;
            this.resetFormData();
            return { success: true };
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
            this.state.mensagemErro = this.getErrorMessage(error);
            this.state.showErrorModal = true;
            return { success: false, message: error.message };
        }
    };

    resetFormData = () => {
        this.state.formData = {
            data_atual: this.state.today,
            horas: "",
            numeroDaCarga: "",
            porcentagem: "",
            minerio: "",
            quantidade: "",
            calcareo: "",
            bauxita: "",
            coque: "",
            secas: "",
            sucataGusa: "",
            sucataAco: "",
            totalCargas: ""
        };
        this.state.mensagemErro = "";
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };

    handleClose = () => {
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };

    returnResults = async (data_atual) => {
        try {
            const response = await axios.get(`http://localhost:8080/leito-fusao?data=${data_atual}`, this.state.formData, {})
            this.state.results = response.data;
        } catch (error) {
            console.log("Erro ao retornar registros", error);
        }
    }
}

export default CargasLeitoFusaoService;
