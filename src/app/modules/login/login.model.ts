import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginFields: FormlyFieldConfig[] = [
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'Email',
      required: true
    }
  },
  {
    key: 'password',
    type: 'input',
    templateOptions: {
      type: 'password',
      label: 'Password',
      required: true
    }
  }
];
