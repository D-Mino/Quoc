import { FormlyFieldConfig } from '@ngx-formly/core';

export const loginFields: FormlyFieldConfig[] = [
  {
    key: 'username',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'Username',
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
