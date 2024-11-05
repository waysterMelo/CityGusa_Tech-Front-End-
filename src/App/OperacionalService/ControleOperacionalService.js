import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axios from "axios";
dayjs.extend(duration);

class ControleDeCorridasService {
    constructor() {
        this.formData = {
            horaInicio: '',
            horaFim: '',
            minutos: '',
            minutosAcumulados: '', // Este campo pode ser preenchido no backend, mas adicionei para coerência e para ser retornado na tabela
            conchas: '',
            silicioVisual: '',  // Corrigido para seguir o DTO
            silicioReal: '',    // Corrigido para seguir o DTO
            fosforo: '',
            manganes: '',
            silica: '',
            escoriaInicio: '',  // Corrigido para seguir o DTO
            escoriaFim: '',     // Corrigido para seguir o DTO
            tipoEscoria: '',    // Corrigido para seguir o DTO
            cargaFundidaDe: '', // Corrigido para seguir o DTO
            cargaFundidaAte: '',// Corrigido para seguir o DTO
            quantidade: '',
            feGusaKg: '',       // Corrigido para seguir o DTO
            ferro: '',
            realTn: '',
            tempoCorridaMinutos: '', // Corrigido para seguir o DTO
            gusaMinuto: '',     // Corrigido para seguir o DTO
            carvaoKg: '',       // Corrigido para seguir o DTO
            carvaoMetros: '',   // Corrigido para seguir o DTO
            sopradores1: '',    // Corrigido para seguir o DTO
            sopradores2: '',    // Corrigido para seguir o DTO
            sopradores3: '',    // Corrigido para seguir o DTO
            sopradores4: '',    // Corrigido para seguir o DTO
            sopradores5: '',    // Corrigido para seguir o DTO
            temperatura: '',
            createdAt:'',
            mediaFosforo:'',
            mediaSilica:'',
            mediaManganes:'',
            realTnAcumulado:'',
            ritmo:''
        };
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
        this.showNullModal = false;
    }


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

    handleChange = (e, setFormData) => {
        const { name, value } = e.target;
        this.formData = {
            ...this.formData,
            [name]: value
        };
        setFormData(this.formData);
    };

    salvar = async () => {
        try {
            const response = await axios.post("http://localhost:8080/runs/add", this.formData, {
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


}

export default ControleDeCorridasService;
