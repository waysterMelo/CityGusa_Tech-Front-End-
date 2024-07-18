import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

class ControleDeCorridasService {
    state = {
        showSuccessModal: false,
        showErrorModal: false,
        mensagemErro: '',
        formData: {},
        corridas: [],
        today: new Date(),
    };

    handleChange = (e) => {
        this.state.formData[e.target.name] = e.target.value;
    };

    handleSubmit = async (e) => {
        // Adicione sua lógica de envio de formulário aqui
        try {
            // Lógica de envio de dados
            this.state.showSuccessModal = true;
        } catch (error) {
            this.state.showErrorModal = true;
            this.state.mensagemErro = error.message;
        }
    };

    handleClose = () => {
        this.state.showSuccessModal = false;
        this.state.showErrorModal = false;
    };

    fetchCorridas = async (date) => {
        // Adicione sua lógica de busca de corridas aqui
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
}

export default ControleDeCorridasService;