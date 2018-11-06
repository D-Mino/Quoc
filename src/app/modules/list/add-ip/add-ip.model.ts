import { FormlyFieldConfig } from '@ngx-formly/core/lib/core';

export const Model: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Computer Name',
      placeholder: 'Computer Name',
      required: true,
    },
  },
  {
    key: 'ip',
    type: 'input',
    templateOptions: {
      label: 'IP',
      placeholder: 'IP: 192.168.1.1',
      required: true,
    },
  },
  {
    key: 'host',
    type: 'input',
    defaultValue: '8080',
    templateOptions: {
      label: 'Host',
      placeholder: 'Host: 8080',
      required: true,
    },
  }
];
