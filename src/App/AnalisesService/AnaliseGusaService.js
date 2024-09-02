import axios from "axios";

class AnaliseGusaService {

    constructor() {
        this.formData = {
            data: '',
            produto: '',
            ferro:'',
            silicio:'',
            aluminio:'',
            manganes:''
        }
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false;
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
            this.formData.produto = "GUSA";
            const response = await axios.post("http://localhost:8080/analise-gusa", this.formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Registro inserido com sucesso:", response.data);
            this.showSuccessModal = true;
            return { success: true };
        } catch (error) {
            console.error("Erro ao cadastrar análise", error);
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



}

export default AnaliseGusaService;