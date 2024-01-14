[
  {
    type: 'select', // array, object, input, radio, select, textarea ...
    subType: '',
    name: 'filed_name', // 字段名字
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    dataSource: {
      type: '',
      enum: [],
      dictUrl: '',
    },
    items: []
  },
  {
    type: 'array',
    name: 'filed_name',
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    items: [
      {
        type: 'input',
        name: 'filed_name',
        label: '字段名字',
        label_en: '字段名字',
        required: true,
        items: [
          {
            type: 'input',
            name: 'filed_name',
            label: '字段名字',
            label_en: '字段名字',
            required: true,
            items: []
          },
        ]
      },
    ]
  },
  {
    type: 'object',
    name: 'filed_name',
    label: '字段名字',
    label_en: '字段名字',
    required: true,
    items: [
      {
        type: 'input',
        name: 'filed_name',
        label: '字段名字',
        label_en: '字段名字',
        required: true,
        items: []
      },
    ]
  },
]
