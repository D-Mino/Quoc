import { FormlyFieldConfig } from '@ngx-formly/core';

const regex = (regex, message) => {
  return {
    expression: (c) => regex.test(c.value),
    message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a valid ${message}`,
  };
};

const required = (type) => {
  return type ? 'This field is required!' : 'Choose an option from above!';
};


const date = (regex) => {
  return {
    expression: (c) => {
      if (c.value !== null && c.value !== undefined && c.value._f !== undefined)
        return regex.test(c.value._i);
      else
        return true;
    },
    message: (error, field: FormlyFieldConfig) => {
      return `"${field.formControl.value._i}" is not a valid date`;
    },
  };
};

export const validation = {
  required: required(true),
  required_select: required(false),
  time: regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'HH:MM time'),
  date: date(/^([0-31]{2}\/[0-12]{2}\/\d{4})$/),
  siaBadge: regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'badge number'),
  drivingLicence: regex(/^[A-Z0-9]{5}\d[0156]\d([0][1-9]|[12]\d|3[01])\d[A-Z0-9]{3}[A-Z]{2}$/, 'driving licence number'),
  postcode: regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/, 'postcode'),
  email: regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/, 'email'),
  phone: regex(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/, 'contact number'),
  niNumber: regex(/^[A-z]{2}\s?[\d]{2}\s?[\d]{2}\s?[\d]{2}\s?[A-z]{1}$/, 'National Insurance Number'),
}