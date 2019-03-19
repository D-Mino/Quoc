import { FormlyFieldConfig } from '@ngx-formly/core/lib/core';

export const Model: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Name',
      required: true,
    },
  },
  {
    key: 'ip',
    type: 'input',
    templateOptions: {
      label: 'IP',
      required: true,
    },
  },
  {
    key: 'description',
    type: 'input',
    templateOptions: {
      label: 'Description',
      required: true,
    },
  },
  {
    key: 'system',
    type: 'input',
    templateOptions: {
      label: 'System',
      required: true,
    },
  },
  {
    key: 'memory',
    type: 'input',
    templateOptions: {
      label: 'Memory',
      required: true,
    },
  },
  {
    key: 'cpu',
    type: 'input',
    templateOptions: {
      label: 'CPU',
      required: true,
    },
  }
];
