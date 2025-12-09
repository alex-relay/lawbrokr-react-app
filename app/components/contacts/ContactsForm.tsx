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

import {
  SubmitHandler,
  useForm,
  Controller,
  FieldErrors,
} from "react-hook-form";

import { getIsURL, getIsValidNumber, transformFormData } from "./utils";
import { ContactsFormInput } from "./types";
import { Contact } from "../../api/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContactsContext } from "../../ContactsContext";

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
  id?: string
}) => (
  <div className={"h-20"}>
    <TextInput className="max-w-50" {...field} {...rest} />
    {!!errorMessage && <HelperText color="failure">{errorMessage}</HelperText>}
  </div>
);

const getExistingContact = (contacts: Contact[], data?: Contact) => {
  if (!data) {
    return null;
  }
  const formValues = Object.values(data);
  const existingContact = contacts.find((contact) => {
    const contactValues = Object.entries(contact);
    const commonalities = contactValues.filter(
      ([key, value]) =>
        !["last-contacted", "notes"].includes(key) &&
        formValues.includes(value),
    );
    return commonalities.length >= 5;
  });

  return existingContact;
};

const formDefaultValues = {
  company: "",
  country: "",
  city: "",
  state: "",
  employees: "",
  zipCode: "",
  website: "",
  salesRep: "",
  purchased: false,
  lastContacted: undefined,
  revenue: "",
};

const ContactsForm = ({
  onContactsDataChange,
}: {
  onContactsDataChange: (data: Contact[]) => void;
}) => {
  const { contacts } = useContactsContext();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactsFormInput>({
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<ContactsFormInput> = (data) => {
    const currentTableData = sessionStorage.getItem("contactsData");
    const parsedCurrentTableData: Contact[] = JSON.parse(
      currentTableData ?? "",
    );

    const id = contacts?.length + 1;

    const transformedFormData = transformFormData(data, id) as Contact;

    const existingContact = getExistingContact(contacts, transformedFormData);

    let updatedTable;

    if (existingContact) {
      const filteredCurrentTable = parsedCurrentTableData.filter(
        (contact) => contact.id !== existingContact?.id,
      );
      updatedTable = [...filteredCurrentTable, transformedFormData];
    } else {
      updatedTable = [...parsedCurrentTableData, transformedFormData];
    }

    sessionStorage.setItem("contactsData", JSON.stringify(updatedTable));
    onContactsDataChange(updatedTable);

    router.push("/");

    return updatedTable;
  };

  const onError = (errors: FieldErrors<ContactsFormInput>) => {
    console.log("Validation Errors:", errors);
  };

  useEffect(() => {
    reset(formDefaultValues);
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-4" data-testid="contacts-form">
      <h1 className="text-[var(--color-my-brand-primary)]">
        {" "}
        <b>Table Entry Form</b>{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap gap-4">
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="primary"
                  htmlFor="company"
                >
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
                    id="company"
                    placeholder="e.g. Amazon"
                    color={errors.company ? "failure" : "white"}
                    errorMessage={errors.company?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  color="grey"
                  className="text-[var(--color-my-brand-primary)]"
                  htmlFor="country"
                >
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
                    id="country"
                    placeholder="e.g. USA"
                    color={errors.company ? "failure" : "white"}
                    errorMessage={errors.country?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  htmlFor="state"
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                >
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
                    id="state"
                    placeholder="e.g. California"
                    color={errors.state ? "failure" : "white"}
                    errorMessage={errors.state?.message}
                  />
                )}
              />
            </div>

            <div>
              <div>
                <Label
                  htmlFor="employees"
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                >
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
                render={({ field }) => {
                  const { onChange } = field;
                  return (
                    <>
                      <TextInput
                        {...field}
                        color={errors.employees ? "failure" : "white"}
                        placeholder="e.g. 43"
                        inputMode="numeric"
                        value={field.value ?? ""}
                        id="employees"
                        onChange={(event) => {
                          const val = event.target.value;
                          if (isNaN(Number(val))) {
                            onChange(null);
                          } else {
                            onChange(Number(val));
                          }
                        }}
                      />
                      {errors.employees && (
                        <HelperText color="failure">
                          {errors.employees?.message}
                        </HelperText>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  htmlFor="zipCode"
                  color="grey"
                >
                  Zip Code
                </Label>
              </div>
              <Controller
                name="zipCode"
                control={control}
                rules={{
                  required: "Zip code must be in a valid format",
                  pattern: {
                    value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                    message: "Zip code must be in a valid format",
                  },
                }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    id="zipCode"
                    placeholder="e.g. 20016"
                    color={errors.zipCode ? "failure" : "white"}
                    errorMessage={errors.zipCode?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  htmlFor="website"
                  color="grey"
                >
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
                    id="website"
                    placeholder="e.g. https://www.cbc.ca"
                    color={errors.website ? "failure" : "white"}
                    errorMessage={errors.website?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                  htmlFor="salesRep"
                >
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
                    id="salesRep"
                    placeholder="e.g. Linda"
                    color={errors.salesRep ? "failure" : "white"}
                    errorMessage={errors.salesRep?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                  htmlFor="revenue"
                >
                  Revenue
                </Label>
              </div>
              <Controller
                name="revenue"
                control={control}
                rules={{
                  required: "Revenue number is required",
                  validate: getIsValidNumber,
                }}
                render={({ field }) => {
                  const { onChange } = field;
                  return (
                    <>
                      <TextInput
                        {...field}
                        color={errors.revenue ? "failure" : "white"}
                        placeholder="e.g. 43"
                        inputMode="numeric"
                        id="revenue"
                        value={field.value ?? ""}
                        onChange={(event) => {
                          const val = event.target.value;
                          if (isNaN(Number(val))) {
                            onChange(null);
                          } else {
                            onChange(Number(val));
                          }
                        }}
                      />
                      {errors.revenue?.message && (
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
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                  htmlFor="city"
                >
                  City
                </Label>
              </div>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required", maxLength: 30 }}
                render={({ field }) => (
                  <GenericTextInputWithErrorMessage
                    field={field}
                    id="city"
                    placeholder="e.g. Los Angeles"
                    color={errors.city ? "failure" : "white"}
                    errorMessage={errors.city?.message}
                  />
                )}
              />
            </div>
            <div>
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                  htmlFor="lastContacted"
                >
                  Last Contacted
                </Label>
              </div>
              <Controller
                name="lastContacted"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <>
                    <Datepicker
                      value={
                        field.value instanceof Date ? field.value : undefined
                      }
                      color="white"
                      id="lastContacted"
                      onChange={(date: Date | null) =>
                        field.onChange(date?.toLocaleDateString("en-CA"))
                      }
                      onBlur={field.onBlur}
                    />
                    {errors.lastContacted && (
                      <HelperText color="failure">
                        {errors.lastContacted.message}
                      </HelperText>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <Label
                  className="text-[var(--color-my-brand-primary)]"
                  color="grey"
                  htmlFor="purchased"
                >
                  Purchased
                </Label>
              </div>
              <Controller
                name="purchased"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleSwitch
                      checked={!!field.value}
                      onChange={(checked) => field.onChange(checked)}
                      onBlur={field.onBlur}
                    />
                    {errors.purchased && (
                      <HelperText color="failure">
                        {errors.purchased.message}
                      </HelperText>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="dark:bg-my-brand-primary hover:text-my-brand-primary cursor-pointer text-white hover:dark:bg-gray-200"
              type="submit"
            >
              {" "}
              Add Entry{" "}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactsForm;
