import * as Yup from 'yup';

export const getValidationSchema = (channelsNames) => Yup.object().shape({
  newChannelName: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
    .notOneOf(channelsNames, 'Already exist!'),
});