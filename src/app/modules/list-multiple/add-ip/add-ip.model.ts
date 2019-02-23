import { FormlyFieldConfig } from '@ngx-formly/core/lib/core';

export const Model: FormlyFieldConfig[] = [
  {
    key: 'script_id',
    type: 'select',
    templateOptions: {
      placeholder: 'Script',
      required: true,
      options: []
    },
  },
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
    key: 'port',
    type: 'input',
    defaultValue: '8080',
    templateOptions: {
      label: 'Port',
      placeholder: 'Host: 8080',
      required: true,
    },
  }
];
