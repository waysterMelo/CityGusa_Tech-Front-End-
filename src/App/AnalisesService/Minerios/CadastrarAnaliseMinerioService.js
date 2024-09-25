import axios from "axios";

class CadastrarAnaliseMinerioService {

    constructor() {
        this.formData = {
           minerio:'',
            lote: '',
            patio: '',
            tonelada:'',
            ferro:'',
            silica:'',
            aluminio:'',
            fosforo:'',
            manganes:'',
            ppc:''
        }
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
    }

    resetFormData = (setFormData) => {
        this.formData = {
            minerio:'',
            lote: '',
            patio: '',
            tonelada:'',
            ferro:'',
            silica:'',
            aluminio:'',
            fosforo:'',
            manganes:'',
            ppc:''
        };
        setFormData(this.formData);
    }

    salvar = async (formData) => {
        try {
            const response = await axios.post("http://localhost:8080/analise-minerio",
                formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            this.showSuccessModal = true;
            return {success: true, data: response.data}
        } catch (error) {
            console.error("Erro ao cadastrar minério", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return {success: false, errorMessage: this.mensagemErro}
        }
    }

    getErrorMessage = (error) => {
        if(error.response){
            // o servidor respondeu com um status fora do intervalo 2xx
            return `Erro: Status code: ${error.response.status} - ${error.response.data}`;
        }else if (error.request) {
            // a requisicao foi feita, mas nao houve resposta
            return `Erro: Sem resposta do servidor`;
        }else {
            // algum outro problema ocorreu na requisicao
            return `Erro: ${error.message}`;
        }
    };

    handleClose = (setShowSuccessModal, setShowErrorModal, setShowNullModal) => {
        if (setShowSuccessModal) setShowSuccessModal(false);
        if (setShowErrorModal) setShowErrorModal(false);
        if (setShowNullModal) setShowNullModal(false);
        this.showSuccessModal = false;
        this.showErrorModal = false;
    };

    async getMineriosPorLote(lote){
        try {
            const response = await axios.get(`http://localhost:8080/minerios/pesquisar-lote?lote=${lote}`);
            if (response.data.length === 0) {
                this.mensagemErro = "Nenhum dado encontrado.";
                this.showErrorModal = true;
                return { success: false, message: "Nenhum dado encontrado." };
            }
            this.showSuccessModal = true;
            return { success: true, data: response.data };
        }catch (error) {
            console.error("Erro ao buscar informações por lote:", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return { success: false, message: error.message };
        }
    }

    async getAnaliseDoDia(){
        try {
            const response = await axios.get("http://localhost:8080/analise-minerio");
            return response.data;
        }catch (error){
            console.error("Erro ao buscar análises do dia:", error);
            return [];
        }
    }

    async getAnalisesPorData(date) {
        try {
            const response = await axios.get(`http://localhost:8080/analise-minerio/por-data?data=${date}`);

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

    handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

}

export default CadastrarAnaliseMinerioService;