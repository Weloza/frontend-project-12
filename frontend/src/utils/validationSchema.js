import * as Yup from 'yup';

export const getValidationSchema = (channelsNames) => Yup.object().shape({
  newChannelName: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле')
    .notOneOf(channelsNames, 'Канал уже существует'),
});

export const getValidationSchema2 = () => Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  
  confirmPassword: Yup.string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});