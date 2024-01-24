// Register this widget instance
Fliplet.Widget.instance({
  name: 'image-component',
  displayName: 'Image component',
  render: {
    template: ['<div class="image-component-container"></div>'].join(''),
    ready: async function() {
      // Initialize children components when this widget is ready
      await Fliplet.Widget.initializeChildren(this.$el, this);

      const imageComponent = this;
      // const $imageComponent = $(this);
      const placeholderPath = '../img/placeholder.jpg';
      // const $imageContainer = $imageComponent.find(
      //   '.image-component-container'
      // );

      let finalImage;
      let dataSourceId = null;
      let selectedImageColumn = null;
      let noImageFound = null;

      imageComponent.fields = _.assign(
        {
          noImageFound: 'Placeholder',
          imageColumn: ''
        },
        imageComponent.fields
      );
      selectedImageColumn = imageComponent.fields.imageColumn;
      noImageFound = imageComponent.fields.noImageFound;

      if (!Fliplet.DynamicContainer) {
        return showToastMessage(
          'Please add dynamic container and configure it'
        );
      }

      // Detail view
      Fliplet.DynamicContainer.get().then(function(container) {
        return container.connection().then(function(connection) {
          dataSourceId = connection.id;

          if (!dataSourceId) {
            return showToastMessage(
              'Please select data source from dynamic container'
            );
          }

          return Promise.resolve(true);
        });
      });

      Fliplet.Hooks.on('recordContainerDataRetrieved', function(record) {
        if (!selectedImageColumn) {
          return showToastMessage('Please select column');
        }

        let imageColumnValue = record.entry.data[selectedImageColumn];
        let imageValue = null;

        if (imageColumnValue) {
          if (Array.isArray(imageColumnValue)) {
            if (imageColumnValue.length) {
              imageValue = imageColumnValue[0];
            }
          } else {
            imageValue = imageColumnValue;
          }
        }

        return manageImage(imageValue);
      });

      // List repeater
      // Fliplet.Hooks.on('repeaterDataRetrieved', function(options) {
      //   options.data.length
      //   options.data.map(el => el.id)
      //   options.data[0].dataSourceId
      // });

      function manageImage(imageValue) {
        if (!imageValue && noImageFound === 'Placeholder') {
          finalImage = `<img src="${placeholderPath}" alt="Image component" />`;
        } else {
          // finalImage = `<img src="${Fliplet.Media.authenticate(
          //   imageValue
          // )}" alt="Image component" />`;
          finalImage = `<img src="${imageValue}" alt="Image component" />`;
        }

        if (finalImage) {
          // $imageContainer.html(finalImage);
          $(document).find('.image-component-container').html(finalImage);
        }
      }

      // function manageImageAsArray(arrayValues) {
      //   let images = [];

      //   for (let i = 0; i < arrayValues.length; i++) {
      //     let src = arrayValues[i];

      //     if (src) {
      //       src = Fliplet.Media.authenticate(src);
      //     } else if (noImageFound === 'Placeholder') {
      //       src = placeholderPath;
      //     } else {
      //       continue;
      //     }

      //     let image = $('<img>', {
      //       class: 'image-component',
      //       src,
      //       alt: 'Image component'
      //     });

      //     images.push(image);
      //   }

      //   $imageContainer.append(images);
      // }

      function showToastMessage(message) {
        return Fliplet.UI.Toast(message);
      }
    }
  }
});
