import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axios from "axios";
dayjs.extend(duration);

class ControleDeCorridasService {
    constructor() {
        this.formData = {
            conchas:'',
            carga_fundida_de:'',
            carga_fundida_ate:'',
            horaInicio:'',
            minutos:'',
            carvao_kg:'',
            carvao_metros:'',
            realTn:'',
            fosforo:'',
            manganes:'',
            silica: '',
            sopradores_1:'',
            sopradores_2:'',
            sopradores_3:'',
            sopradores_4:'',
            sopradores_5:'',
            tempo_corrida_minutos:'',
            gusa_minuto:'',
            tipo_escoria:'',
            quantidade:'',
            fe_gusa_kg:'',
            ferro:'',
            silicio_visual:'',
            silicio_real:'',
            escoria_inicio:'',
            escoria_fim:''
        };
        this.mensagemErro = "";
        this.showSuccessModal = false;
        this.showErrorModal = false;
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
        this.formData['carvao_metros'] = value;
        setM3t(value);
    };

    handleTempoCorridaChange = (value, setTempoCorrida) => {
        this.formData['tempo_corrida_minutos'] = value;
        setTempoCorrida(value);
    };

    handleCargaDe = (value, setDe, setFormData) => {
        this.formData['carga_fundida_de'] = value;
        setDe(value);
        setFormData(this.formData);
    };

    handleCargaAte = (value, setAte, setFormData) => {
        this.formData['carga_fundida_ate'] = value;
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
