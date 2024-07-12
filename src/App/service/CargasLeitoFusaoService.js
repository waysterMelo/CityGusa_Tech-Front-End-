import axios from "axios";

class CargasLeitoFusaoService {
    constructor() {
        const todayInput = new Date().toISOString().split("T")[0];

        this.state = {
            formData: {
                data_atual: todayInput,
                horas: "",
                numeroCarga: "",
                porcentagem: "",
                minerio: "Extrativa",
                quantidade: "",
                calcareo: "",
                bauxita: "",
                coque: "",
                secas: "",
                sucataGusa: "",
                sucataAco: ""
            },
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
        const todayInput = new Date().toISOString().split("T")[0];
        this.state.formData = {
            data_atual: todayInput,
            horas: "",
            numeroCarga: "",
            porcentagem: "",
            minerio: "Extrativa",
            quantidade: "",
            calcareo: "",
            bauxita: "",
            coque: "",
            secas: "",
            sucataGusa: "",
            sucataAco: ""
        };
        this.state.mensagemErro = "";
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };

    handleClose = () => {
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };
}

export default CargasLeitoFusaoService;
