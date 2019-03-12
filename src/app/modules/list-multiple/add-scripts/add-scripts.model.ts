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
      label: 'Bên phòng thủ',
      rows: 3
    },
  },
  {
    key: 'attack',
    type: 'textarea',
    templateOptions: {
      label: 'Bên tấn công',
      rows: 3
    }
  }
];
