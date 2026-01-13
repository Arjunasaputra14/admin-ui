import React from "react";
import Labeledinput from "../elements/LabeledInput";
import CheckBox from "../elements/CheckBox";
import Button from "../elements/Button";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignIn({ onSubmit }) {
  return (
    <>
      <div className="mt-16">
        <Formik
          initialValues={{
            email: "",
            password: "",
            status: false,
          }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values.email, values.password);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* EMAIL */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="Arjunasaputra@gmail.com"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="●●●●●●●●●●●●●●"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* CHECKBOX */}
              <div className="mb-3">
                <Field name="status">
                  {({ field }) => (
                    <CheckBox
                      {...field}
                      id="status"
                      type="checkbox"
                      checked={field.value}
                      label="Keep me signed in"
                    />
                  )}
                </Field>
              </div>

              {/* BUTTON */}
              <Button>{isSubmitting ? "Loading..." : "Login"}</Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* OR SIGN IN */}
      <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
        <div className="border border-gray-05 w-full"></div>
        <div className="px-2 bg-special-mainBg absolute">or sign in with</div>
      </div>

      {/* GOOGLE */}
      <div className="mb-8">
        <Button type="button" variant="secondary">
          <span className="h-12 flex items-center justify-center rounded-md text-sm w-full bg-gray-05 text-gray-01">
            Continue with Google
          </span>
        </Button>
      </div>

      {/* REGISTER */}
      <div className="flex justify-center">
        <Link to="register" className="text-primary text-sm font-bold">
          Create an account
        </Link>
      </div>
    </>
  );
}

export default FormSignIn;
