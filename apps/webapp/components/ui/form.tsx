import React from "react";
import { useForm, FormProvider } from "react-hook-form";

const Form = ({ children, onSubmit }) => {
  const methods = useForm();

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;