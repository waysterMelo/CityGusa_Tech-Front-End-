import React, {useEffect, useRef, useState} from "react";
import {Button, Input, InputGroup, useColorModeValue} from "@chakra-ui/react";
import Litepicker from "litepicker";
import {format, startOfDay} from 'date-fns';
import {CheckIcon} from "@chakra-ui/icons";
export function SearchBar(props) {
    const { variant, background, children, placeholder, borderRadius, ...rest } = props;
    const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
    const inputText = useColorModeValue("gray.700", "gray.100");
    const datePicker = useRef(null);
    const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));


    useEffect(() => {
        // Inicialização do Litepicker
        const picker = new Litepicker({
            element: datePicker.current,
            format: 'DD/MM/YYYY', // Formato brasileiro
            lang: {
                days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                    'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                previousMonth: 'Mês anterior',
                nextMonth: 'Próximo mês',
            },
            onSelect: (date) => {
                // Função chamada quando uma data é selecionada
                const formattedDate = format(date, 'dd/MM/yyyy'); // Formata a data no formato
                // brasileiro
                console.log(formattedDate);
                // Você pode usar a data formatada como desejar
                setSelectedDate(date);
            },
            startDate: selectedDate
        });

        // Retorna uma função de limpeza para remover o Litepicker quando o componente for desmontado
        return () => {
            picker.destroy();
        };
    }, [selectedDate]);//// Adiciona selectedDate como dependência para que o
    // Litepicker seja atualizado quando a data mudar

    return (
        <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
            <Input className={'react-calendar'}
                ref={datePicker}
                variant='search'
                fontSize='md'
                bg={background ? background : inputBg}
                color={inputText}
                fontWeight='500'
                _placeholder={{ color: "gray.400", fontSize: "14px" }}
                borderRadius={borderRadius ? borderRadius : "30px"}
                placeholder={placeholder ? placeholder : "selecionar data..."}
            />
            <Button leftIcon={<CheckIcon />}  _hover={{ bg: "green.500" }} variant='solid'></Button>
        </InputGroup>
    );
}