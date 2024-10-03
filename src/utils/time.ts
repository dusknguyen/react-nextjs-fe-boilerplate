import moment from 'moment';

export const formatDate = (date: number) => moment(date).format('MMMM D, YYYY h:mm A');
