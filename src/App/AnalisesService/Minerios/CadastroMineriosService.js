import axios from "axios";

class CadastroMineriosService {

    constructor() {
        this.formData = {
            data: '',
            minerio:'',
            valorTonelada:'',
            lote:'',
            patio:'',
            transportador:'',
            frete:''
        }
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
    }

    resetFormData = (setFormData) => {
        this.formData = {
            data: '',
            minerio:'',
            valorTonelada:'',
            lote:'',
            patio:'',
            transportador:'',
            frete:''
        };
        setFormData(this.formData);
    }


    salvar = async () => {
            try {
                const response = await axios.post("http://localhost:8080/cadastrar-minerios",
                    this.formData, {
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

    handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        this.formData = {
            ...this.formData,
            [name]: value
        };
        setFormData(this.formData);
    };

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

}

export default CadastroMineriosService;