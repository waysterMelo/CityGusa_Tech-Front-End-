import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axios from "axios";
dayjs.extend(duration);

class ControleDeCorridasService {
    constructor() {
        this.state = {
            showSuccessModal: false,
            showErrorModal: false,
            mensagemErro: '',
            formData: {
                horaInicio: '',
                horaFim: '',
                minutos: '',
                conchas: '',
                silicio_visual: '',
                silicio_real: '',
                silica: '',
                fosforo: '',
                manganes: '',
                escoria_inicio: '',
                escoria_fim: '',
                tipo_escoria: '',
                carga_fundida_de: '',
                carga_fundida_ate: '',
                quantidade: '',
                fe_gusa_kg: '',
                ferro: '',
                realTn: '',
                tempo_corrida: '',
                gusa_minuto: '',
                carvao_kg: '',
                carvao_metros: '',
                sopradores_1: '',
                sopradores_2: '',
                sopradores_3: '',
                sopradores_4: '',
                sopradores_5: '',
            }
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
    };

    salvar = async () => {
        try {

            const response = await axios.post("http://localhost:8080/runs/add", this.state.formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Registro inserido com sucesso:", response.data);
            this.state.showSuccessModal = true;
            return { success: true };
        } catch (error) {
            console.error("Erro ao cadastrar corrida:", error);
            this.state.mensagemErro = this.getErrorMessage(error);
            this.state.showErrorModal = true;
            return { success: false, message: this.state.mensagemErro };
        }
    };

    handleClose = () => {
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
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

    handleDateTimeChange = (setter, ref) => (e) => {
        const value = e.target.value;
        setter(value);

        if (value.length === 16) {
            setTimeout(() => {
                if (ref.current) {
                    ref.current.blur();
                }
            }, 100);
        }
    };

    formatReal = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, value.length - 2) + '.' + value.slice(value.length - 2);
        }
        return value;
    };

    handleRealTnChange = (e, setter) => {
        let value = e.target.value;
        value = this.formatReal(value);
        setter(value);
    };

    handleM3tNumber = (e, setter) => {
        let value = e.target.value;
        value = this.formatReal(value);
        setter(value);
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
}

export default ControleDeCorridasService;
