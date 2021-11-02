import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { 
    Calendar as CustomCalendar, 
    LocaleConfig,
    DateCallbackHandler
} from 'react-native-calendars';

import { ptBR } from './localeConfig';

import { generateInterval } from './generateInterval'

LocaleConfig.locales['pt-br'] = ptBR ;

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDatesProps{
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
}

interface DayProps{
    dateString: string;
    day: string;
    month: string;
    year: string;
    timestamp: number
}

interface CalendarProps {
    markedDates: MarkedDatesProps;
    onDayPress: DateCallbackHandler;
}

function Calendar({
    markedDates,
    onDayPress
 }: CalendarProps) {
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
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval
}