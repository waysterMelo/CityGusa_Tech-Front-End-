import axios from "axios";

class VerMineriosService {


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

export default VerMineriosService;