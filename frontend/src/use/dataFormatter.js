import dayjs from 'dayjs';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      name: item.name,
      publicUrl: item.publicUrl || '',
    }));
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },

  productsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  productsOneListFormatter(val) {
    if (!val) return '';
    return val.title;
  },
  productsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },

  categoriesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  categoriesOneListFormatter(val) {
    if (!val) return '';
    return val.title;
  },
  categoriesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
};
