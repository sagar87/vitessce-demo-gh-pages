export const myViewConfig = {
  version: '1.0.6',
  name: 'HBM836.VTFP.364',
  description: 'Periodic acid-Schiff stained microscopy collected from the right kidney.',
  public: true,
  datasets: [
    {
      uid: 'HBM836.VTFP.3641',
      name: 'HBM836.VTFP.3641',
      files: [
        {
          fileType: 'image.ome-tiff',
          url: 'http://localhost:9000/166_1_I1_LK_pyramid.ome.tiff',
        },
      ],
    },
  ],
  initStrategy: 'auto',
  layout: [
    {
      component: 'spatial',
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
    {
      component: 'layerController',
      props: {
        disableChannelsIfRgbDetected: true,
      },
      x: 8,
      y: 0,
      w: 4,
      h: 6,
    },
    {
      component: 'description',
      x: 8,
      y: 6,
      w: 4,
      h: 3,
    },
    {
      component: 'status',
      x: 8,
      y: 9,
      w: 4,
      h: 3,
    },
  ],
};