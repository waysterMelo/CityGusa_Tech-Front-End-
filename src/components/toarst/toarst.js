import toastr from "toastr";


export function mostrarMensagem(titulo, mensagem, tipo){
    toastr[tipo](mensagem, titulo);
}

export function mensagemErro(message){
    mostrarMensagem('Erro', message, 'error')
}

