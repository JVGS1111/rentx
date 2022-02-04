import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export function getPlataformDate(date: Date) {
    // if (Platform.OS === 'ios') {

    // } else {
    //     return date;
    // }
    return addDays(date, 1);
}