import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { 
    Calendar as CustomCalendar, 
    LocaleConfig 
} from 'react-native-calendars';


LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
    const { colors, fonts } = useTheme();    
    return (
        <CustomCalendar 
            renderArrow={(direction) => 
                <Feather 
                    size={24}
                    color={colors.text}
                    name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
                />
            }

            headerStyle={{
                backgroundColor: colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: colors.text_details,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: fonts.primary_400,
                textDayHeaderFontFamily: fonts.primary_500,
                textDayFontSize: 10,
                textMonthFontSize: 20,
                textMonthFontFamily: fonts.secondary_600,
                monthTextColor: colors.title,
                arrowStyle:{
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={new Date()}

        />
    );
}