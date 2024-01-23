// // This function is used to generate the interface for the widget
var dataSourceColumns = [];

Fliplet.DataSources.getById(702725, {
  attributes: ['columns']
}).then(async function(dataSource) {
  dataSourceColumns = dataSource.columns;
  // .map((el) => {
  //   return {
  //     id: el,
  //     label: el
  //   };
  // });

  Fliplet.Widget.generateInterface({
    title: 'Image component',
    fields: [
      {
        type: 'html',
        html: `<header>
              <p>
                Configure image
              <a
                href="https://help.fliplet.com/image-component/"
                class="help-icon"
                target="_blank"
              >
                <i class="fa fa-question-circle-o"></i>
              </a>
              </p>
            </header>
            <hr/>`
      },
      {
        type: 'html',
        html: `<div>
              <h3 class="font-weight-bold">Get image from</h3>
              <p>
                <span class="ds-id">xxxxxx</span>
                <span class="ds-name">xxxx xxxx xxxx</span>
              </p>
            </div>`
      },
      {
        name: 'imageColumn',
        type: 'dropdown',
        label: 'Select column',
        options: dataSourceColumns,
        default: '',
        ready: function() {
          debugger;
        }
      },
      {
        name: 'noImageFound',
        type: 'radio',
        label: 'If no image found',
        options: [
          { value: 'Placeholder', label: 'Show placeholder' },
          { value: 'None', label: 'None' }
        ],
        default: 'Placeholder'
      }
    ]
  });
});
