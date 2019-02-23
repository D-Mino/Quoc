import { FormlyFieldConfig } from '@ngx-formly/core/lib/core';

export const Model: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Scripts Name',
      placeholder: '',
      required: true,
    },
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'Scenario Description',
      placeholder: 'Scenario Description'
    },
  },
];
