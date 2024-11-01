import { render, screen } from "@testing-library/react";
import { FormInput } from "./FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";

const Form = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Form Input with react hook form privider", () => {
  test("existense of a text field", () => {
    render(
      <Form>
        <FormInput name="field" placeholder="type here" type="text" />
      </Form>
    );
    expect(screen.getByPlaceholderText("type here")).toBeInTheDocument();
  });

  test("field with label", () => {
    const label = "Field label";
    render(
      <Form>
        <FormInput name="field" placeholder="type here" label={label} />
      </Form>
    );
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("type here")).toBeInTheDocument();
  });
});
