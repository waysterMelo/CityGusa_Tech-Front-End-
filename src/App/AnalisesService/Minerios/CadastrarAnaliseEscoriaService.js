import axios from "axios";

class CadastrarAnaliseEscoriaService {

    constructor() {
        this.formData = {
            calcio: '',
            silicio: '',
            aluminio: '',
            magnesio:'',
            ferro: '',
            manganes: '',
            indexB: '',
            indexF: '',
            createdAt: '',
            horas: ''
        }
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
    }

    resetFormData = (setFormData) => {
        this.formData = {
            calcio: '',
            silicio: '',
            aluminio: '',
            magnesio:'',
            ferro: '',
            manganes: '',
            indexB: '',
            indexF: ''
        };
        setFormData(this.formData);
    }
    salvar = async (formData) => {
        try {
            const response = await axios.post("http://localhost:8080/analise-escoria",
                formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            this.showSuccessModal = true;
            return {success: true, data: response.data}
        } catch (error) {
            console.error("Erro ao cadastrar análise", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return {success: false, errorMessage: this.mensagemErro}
        }
    }
    async getAnaliseDoDia(){
        try {
            const response = await axios.get("http://localhost:8080/analise-escoria");
            return response.data;
        }catch (error){
            console.error("Erro ao buscar análises do dia:", error);
            return [];
        }
    }
    async getAnalisesPorData(date) {
        try {
            const response = await axios.get(`http://localhost:8080/analise-escoria/por-data?data=${date}`);

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
    handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    handleClose = (setShowSuccessModal, setShowErrorModal, setShowNullModal) => {
        if (setShowSuccessModal) setShowSuccessModal(false);
        if (setShowErrorModal) setShowErrorModal(false);
        if (setShowNullModal) setShowNullModal(false);
        this.showSuccessModal = false;
        this.showErrorModal = false;
    };
}

export default CadastrarAnaliseEscoriaService;