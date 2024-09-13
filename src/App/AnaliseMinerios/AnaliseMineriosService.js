import axios from "axios";

class AnaliseMineriosService {

    constructor() {
        this.formData = {
            data: '',

        }
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false;
    }

    resetFormData = (setFormData) => {
        this.formData = {

        };
        setFormData(this.formData);
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

    }

    handleClose = (setShowSuccessModal, setShowErrorModal, setShowNullModal) => {
        if (setShowSuccessModal) setShowSuccessModal(false);
        if (setShowErrorModal) setShowErrorModal(false);
        if (setShowNullModal) setShowNullModal(false);
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false
    };

    async getAnaliseDoDia(){
            try {
                const response = await axios.get("http://localhost:8080/");
                return response.data;
            }catch (error){
                console.error("Erro ao buscar análises do dia:", error);
                return [];
            }
    }

    async getAnalisesPorData(date) {
        try {
            const response = await axios.get(`http://localhost:8080/analise-minerios/por-data?data=${date}`);

            if (response.data.length === 0) {
                this.mensagemErro = "Não há informações cadastradas nessa data.";
                this.showErrorModal = true;
                return { success: false, message: "Nenhum dado encontrado." };
            }
            this.showSuccessModal = true;
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return { success: false, message: error.message };
        }
    }

}

export default AnaliseMineriosService;