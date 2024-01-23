// // This function is used to generate the interface for the widget
var dataSourceColumns = [];

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
      options: [],
      default: '',
      ready: async function() {
        if (Fliplet.DynamicContainer) {
          return await Fliplet.DynamicContainer.get().then(function(
            container
          ) {
            return container.connection().then(function(connection) {
              return connection.id;
            }).then((dataSourceId) => {
              return Fliplet.DataSources.getById(dataSourceId, {
                attributes: ['columns']
              }).then(async function(dataSource) {
                dataSourceColumns = dataSource.columns.map((el) => {
                  return {
                    id: el,
                    label: el
                  };
                });
                // Fliplet.Helper.field('imageColumn');
                debugger;

                return Promise.resolve(true);
              });
            });
          });
        }
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
