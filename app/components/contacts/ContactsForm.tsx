"use client";

import {
  Button,
  Datepicker,
  HelperText,
  Label,
  TextInput,
  TextInputProps,
  ToggleSwitch,
} from "flowbite-react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";

import "./contacts.css";
import { getIsURL, getIsValidNumber, transformFormData } from "./utils";
import { ContactsFormInput } from "./types";
import { Contact } from "../../api/api";

const GenericTextInputWithErrorMessage = ({
  field,
  errorMessage = "",
  ...rest
}: {
  field: TextInputProps;
  errorMessage?: string;
  placeholder?: string;
  color?: string;
  type?: string;
}) => (
  <div className={"h-20"}>
    <TextInput className="max-w-50" {...field} {...rest} />
    {!!errorMessage && <HelperText color="failure">{errorMessage}</HelperText>}
  </div>
);

const ContactsForm = ({
  onContactsDataChange,
}: {
  onContactsDataChange: (data: Contact[]) => void;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactsFormInput>({
    defaultValues: {
      company: "",
      country: "",
      city: "",
      state: "",
      employees: "",
      zipCode: "",
      website: "",
      salesRep: "",
      purchased: false,
      lastContacted: new Date(),
      revenue: "",
    },
  });

  const onSubmit: SubmitHandler<ContactsFormInput> = (data) => {
    const currentTableData = sessionStorage.getItem("contactsData");
    const parsedCurrentTableData = JSON.parse(currentTableData ?? "");

    const transformedFormData = transformFormData(data);

    const updatedTable = [...parsedCurrentTableData, transformedFormData];

    sessionStorage.setItem("contactsData", JSON.stringify(updatedTable));
    onContactsDataChange(updatedTable)

    return updatedTable;
  };

  const onError = (errors: any) => {
    console.log("Validation Errors:", errors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap gap-4">
            <div>
              <div>
                <Label color="grey" htmlFor="company">
                  Company
                </Label>
              </div>
              <Controller
                name="company"
                control={control}
                rules={{ required: "Company name is required" }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. Amazon"
                    color={errors.company ? "failure" : "white"}
                    errorMessage={errors.company?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label color="grey" htmlFor="country">
                  Country
                </Label>
              </div>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country must be USA" }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. USA"
                    color={errors.company ? "failure" : "white"}
                    errorMessage={errors.country?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label htmlFor="state" color="grey">
                  State
                </Label>
              </div>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. California"
                    color={errors.state ? "failure" : "white"}
                    errorMessage={errors.state?.message}
                  />
                )}
              />
            </div>

            <div>
              <div>
                <Label htmlFor="employees" color="grey">
                  Employees
                </Label>
              </div>
              <Controller
                name="employees"
                control={control}
                rules={{
                  required: "Number of employees is required",
                  validate: getIsValidNumber,
                }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. 2"
                    color={errors.employees ? "failure" : "white"}
                    errorMessage={errors.employees?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label htmlFor="zipCode" color="grey">
                  Zip Code
                </Label>
              </div>
              <Controller
                name="zipCode"
                control={control}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                    message: "Zip code must be in a valid format",
                  },
                }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. 20016"
                    color={errors.zipCode ? "failure" : "white"}
                    errorMessage={errors.zipCode?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label htmlFor="website" color="grey">
                  Website
                </Label>
              </div>
              <Controller
                name="website"
                control={control}
                rules={{
                  required: "Website must be a valid url",
                  maxLength: 50,
                  validate: getIsURL,
                }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. https://www.cbc.ca"
                    color={errors.website ? "failure" : "white"}
                    errorMessage={errors.website?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label color="grey" htmlFor="salesRep">
                  Sales Rep
                </Label>
              </div>
              <Controller
                name="salesRep"
                control={control}
                rules={{
                  required: "Sales rep name is required",
                  maxLength: {
                    value: 30,
                    message: "Sales rep name must not exceed 30 characters",
                  },
                }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    type="text"
                    placeholder="e.g. Linda"
                    color={errors.salesRep ? "failure" : "white"}
                    errorMessage={errors.salesRep?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label color="grey" htmlFor="revenue">
                  Revenue
                </Label>
              </div>
              <Controller
                name="revenue"
                control={control}
                rules={{
                  required: true,
                  validate: getIsValidNumber,
                }}
                render={({ field }) => {
                  return (
                    <>
                      <TextInput
                        {...field}
                        color="white"
                        placeholder="e.g. 43"
                        inputMode="numeric"
                        value={field.value ?? ""}
                        onChange={(event) => {
                          const val = event.target.value;
                          if (isNaN(Number(val))) {
                            field.onChange(null);
                          } else {
                            field.onChange(val);
                          }
                        }}
                      />
                      {errors.revenue && (
                        <HelperText color="failure">
                          {errors.revenue.message}
                        </HelperText>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div>
              <div>
                <Label color="grey" htmlFor="city">
                  City
                </Label>
              </div>
              <Controller
                name="city"
                control={control}
                rules={{ required: true, maxLength: 30 }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    placeholder="e.g. Los Angeles"
                    color={errors.city ? "failure" : "white"}
                    errorMessage={errors.city?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label color="grey" htmlFor="lastContacted">
                  Last Contacted
                </Label>
              </div>
              <Controller
                name="lastContacted"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div>
                    <Datepicker
                      value={
                        field.value instanceof Date ? field.value : undefined
                      }
                      color="white"
                      onChange={(date: Date | null) => field.onChange(date)}
                      onBlur={field.onBlur}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Label color="grey" htmlFor="purchased">
                  Purchased
                </Label>
              </div>
              <Controller
                name="purchased"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ToggleSwitch
                    checked={!!field.value}
                    onChange={(checked) => field.onChange(checked)}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit"> Add Entry </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactsForm;
