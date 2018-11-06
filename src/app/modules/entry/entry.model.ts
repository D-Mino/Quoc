import { FormlyFieldConfig } from '@ngx-formly/core';

export interface EntryModel {
  selection: string;
  type: string;
  name: string;
  occurrence: string;
  outcome: string;
}

export const entryFields: FormlyFieldConfig[] = [
  {
    key: 'selection',
    type: 'radio',
    templateOptions: {
      label: 'Selection',
      placeholder: 'Selection',
      required: true,
      color: 'primary',
      options: [
        { value: 'Log', label: 'Log' },
        { value: 'Report', label: 'Report' },
      ]
    },
  },
  {
    key: 'type',
    type: 'select',
    templateOptions: {
      required: true,
      label: 'Log Type',
      options: [
        {
          value: 'Log',
          label: 'Log'
        },
        {
          value: 'Antisocial Behaviour',
          label: 'Antisocial Behaviour'
        },
        {
          value: 'Appreciations',
          label: 'Appreciations'
        },
        {
          value: 'Begging',
          label: 'Begging'
        },
        {
          value: 'Community Engagement',
          label: 'Community Engagement'
        },
        {
          value: 'Crime',
          label: 'Crime'
        },
        {
          value: 'Crime - Intelligence',
          label: 'Crime - Intelligence'
        },
        {
          value: 'Drugs',
          label: 'Drugs'
        },
        {
          value: 'First Aid',
          label: 'First Aid'
        },
        {
          value: 'Missing Person',
          label: 'Missing Person'
        },
        {
          value: 'Health & Safety',
          label: 'Health & Safety'
        },
        {
          value: 'Rough Sleeping',
          label: 'Rough Sleeping'
        },
        {
          value: 'Other',
          label: 'Other'
        }
      ]
    },
    hideExpression: 'model.selection === "Report"'
  },
  {
    key: 'name',
    type: 'autocomplete',
    className: 'staff-names',
    templateOptions: {
      required: true,
      label: 'Staff Name'
    }
  },
  {
    key: 'occurrence',
    type: 'textarea',
    templateOptions: {
      required: true,
      rows: 3,
      label: 'Event Occurrence'
    }
  },
  {
    key: 'outcome',
    type: 'textarea',
    templateOptions: {
      rows: 3,
      label: 'Event Outcome'
    },
    hideExpression: 'model.selection === "Report"'
  }
];
