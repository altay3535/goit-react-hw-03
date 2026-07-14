import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

// Adım 3 - Yup ile Doğrulama Kuralları
const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short! (Min 3)")
    .max(50, "Too Long! (Max 50)")
    .required("Required Field"),
  number: Yup.string()
    .min(3, "Too Short! (Min 3)")
    .max(50, "Too Long! (Max 50)")
    .required("Required Field"),
});

const initialValues = {
  username: "",
  number: "",
};

const ContactForm = ({ onAdd }) => {
  const nameId = useId();
  const numberId = useId();

  const handleSubmit = (values, actions) => {
    // App.jsx'teki ekleme fonksiyonuna verileri gönderiyoruz
    onAdd({ name: values.username, number: values.number });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.fieldWrapper}>
          <label htmlFor={nameId}>Name</label>
          <Field className={css.input} type="text" name="username" id={nameId} />
          <ErrorMessage className={css.error} name="username" component="span" />
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor={numberId}>Number</label>
          <Field className={css.input} type="text" name="number" id={numberId} />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.btn} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;