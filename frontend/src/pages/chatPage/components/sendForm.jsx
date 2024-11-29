import { SendButton } from "../../../icons";
import { useSelector } from "react-redux";
import { useAddMessageMutation } from "../../../api/messagesApi";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import filter from 'leo-profanity';

export const SendForm = () => {
  const { t } = useTranslation();
  const { selectedChannel } = useSelector((state) => state.selectedChannel);
  const username = useSelector((state) => state.auth.username);
  const [addMessage] = useAddMessageMutation();
  const input = useRef(null);
  
  filter.add(filter.getDictionary('ru'));

  const handleSendMessage = async (values, { setSubmitting, resetForm }) => {
    try {
      const filteredMessage = filter.clean(values.message);
      const message = {
        body: filteredMessage,
        channelId: selectedChannel.id,
        username: username,
      };

      await addMessage(message);
      resetForm();

    } catch (error) {
      console.log(error);

    } finally {
      setSubmitting(false);
      input.current.focus();
    };
  }

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSendMessage,
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [formik.isSubmitting, selectedChannel]);

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" noValidate="" onSubmit={formik.handleSubmit}>
        <div className="input-group has-validation">
          <input
            name="message"
            aria-label={t('chatPage.newMessage')} 
            placeholder={t('chatPage.enterMessage')} 
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            ref={input}
          />
          <button type="submit" className="btn btn-group-vertical" disabled={formik.isSubmitting}>
            <SendButton color="#0d6efd" />
            <span className="visually-hidden">{t('chatPage.send')}</span>
          </button>
        </div>
      </form>
    </div>   
  )
};