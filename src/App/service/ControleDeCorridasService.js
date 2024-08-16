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
    }

    resetFormService=()=> {
        this.formData = {
            horaInicio: '',
            horaFim: '',
            minutos: '',
            minutosAcumulados: '',
            conchas: '',
            silicioVisual: '',
            silicioReal: '',
            fosforo: '',
            manganes: '',
            silica: '',
            escoriaInicio: '',
            escoriaFim: '',
            tipoEscoria: '',
            cargaFundidaDe: '',
            cargaFundidaAte: '',
            quantidade: '',
            feGusaKg: '',
            ferro: '',
            realTn: '',
            tempoCorridaMinutos: '',
            gusaMinuto: '',
            carvaoKg: '',
            carvaoMetros: '',
            sopradores1: '',
            sopradores2: '',
            sopradores3: '',
            sopradores4: '',
            sopradores5: '',
            temperatura: ''
        }
    }

    async getCorridasDoDia() {
        try {
            const response = await axios.get("http://localhost:8080/runs/today");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar corridas do dia:", error);
            return [];
        }
    }

    async getCorridasPorData(date) {
        try {
            const response = await axios.get(`http://localhost:8080/runs/por-data?date=${date}`);

            if (response.data.length === 0) {
                this.mensagemErro = "Não há informações cadastradas nessa data.";
                this.showErrorModal = true;
                return { success: false, message: "Nenhum dado encontrado." };
            }
            this.showSuccessModal = true;
            return { success: true, data: response.data };
        } catch (error) {
            console.error("Erro ao buscar corridas:", error);
            this.mensagemErro = this.getErrorMessage(error);
            this.showErrorModal = true;
            return { success: false, message: error.message };
        }
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

    handleClose = (setShowSuccessModal, setShowErrorModal) => {
        this.showSuccessModal = false;
        this.showErrorModal = false;
        setShowSuccessModal(false);
        setShowErrorModal(false);
    };

    calcularMinutos = (inicio, fim) => {
        const horaInicio = dayjs(inicio);
        const horaFim = dayjs(fim);
        if (horaInicio.isValid() && horaFim.isValid()) {
            const diff = horaFim.diff(horaInicio);
            return dayjs.duration(diff).asMinutes();
        }
        return '';
    };

    calcularQt = (de, ate) => {
        if (de && ate) {
            return (parseInt(ate) - parseInt(de)) + 1;
        }
        return '';
    };

    calcularToneladaGusaMin = (real, minutos) => {
        if (real && minutos) {
            return (parseFloat(real) / parseFloat(minutos)).toFixed(3);
        }
        return '';
    };

    handleDateTimeChange = (name, value, setFormData) => {
        this.formData[name] = value;
        setFormData(this.formData);
    };

    handleQuantidade = (name, value, setFormData) => {
        this.formData[name] = value;
        setFormData(this.formData);
    };

    handleGusaPorMinuto = (name, value, setFormData) => {
        this.formData[name] = value;
        setFormData(this.formData);
    };

    formatReal = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
        }
        return value;
    };

    handleRealTnChange = (e, setRealTn) => {
        let value = e.target.value;
        value = this.formatReal(value);
        this.formData['realTn'] = value;
        setRealTn(value);
    };

    handleM3tNumber = (e, setM3t) => {
        let value = e.target.value;
        value = this.formatReal(value);
        this.formData['carvaoMetros'] = value;
        setM3t(value);
    };

    handleTempoCorridaChange = (value, setTempoCorrida) => {
        this.formData['tempoCorridaMinutos'] = value;
        setTempoCorrida(value);
    };

    handleCargaDe = (value, setDe, setFormData) => {
        this.formData['cargaFundidaDe'] = value;
        setDe(value);
        setFormData(this.formData);
    };

    handleCargaAte = (value, setAte, setFormData) => {
        this.formData['cargaFundidaAte'] = value;
        setAte(value);
        setFormData(this.formData);
    };

    handle_fe_gusa_kg = (name, value, setFormData) => {
        this.formData[name] = value;
        setFormData({ ...this.formData });
    };

    handleFerroResultado = (name, value, setFormData) => {
        this.formData[name] = value;
        setFormData({ ...this.formData });
    }

}

export default ControleDeCorridasService;
