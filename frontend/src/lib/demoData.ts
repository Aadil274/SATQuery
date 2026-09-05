// Pre-loaded demo imagery and presets for SatQuery AI
export const IMAGES = {
  opticalCity: '/static/demo_images/optical_city.jpg',
  changeBefore: '/static/demo_images/change_before.jpg',
  changeAfter: '/static/demo_images/change_after.jpg',
  opticalDelta: '/static/demo_images/optical_delta.jpg',
  sarDelta: '/static/demo_images/sar_delta.jpg',
  flood: '/static/demo_images/flood.jpg'
};

const meta = (o: Record<string, string>) => ({
  crs: 'EPSG:4326',
  resolution: '10 m/px',
  bands: 'B2,B3,B4,B8',
  ...o
});

export interface PresetImage {
  name: string;
  url: string;
  modality: 'optical' | 'sar';
  timestamp: string;
  meta: Record<string, string>;
}

export interface Preset {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  images: PresetImage[];
  query: string;
}

export const PRESETS: Preset[] = [
  {
    id: 'single_vqa',
    title: 'Single-Image VQA / Caption',
    subtitle: 'Sentinel-2 · Urban scene',
    icon: 'ScanSearch',
    images: [
      {
        name: 'urban_scene.tif',
        url: IMAGES.opticalCity,
        modality: 'optical',
        timestamp: '2026-04-13',
        meta: meta({ sensor: 'Sentinel-2 MSI' })
      }
    ],
    query: 'Describe the land-cover and major objects visible in this image.'
  },
  {
    id: 'grounding',
    title: 'Referring Grounding',
    subtitle: 'Sentinel-2 · River delta',
    icon: 'Crosshair',
    images: [
      {
        name: 'delta_scene.tif',
        url: IMAGES.opticalDelta,
        modality: 'optical',
        timestamp: '2026-03-02',
        meta: meta({ sensor: 'Sentinel-2 MSI' })
      }
    ],
    query: 'Highlight all water bodies and meandering river channels in the image.'
  },
  {
    id: 'change',
    title: 'Bi-Temporal Change',
    subtitle: 'Cartosat / S2 · 2024 → 2026',
    icon: 'GitCompareArrows',
    images: [
      {
        name: 'region_2024.tif',
        url: IMAGES.changeBefore,
        modality: 'optical',
        timestamp: '2024-01-18',
        meta: meta({ sensor: 'Sentinel-2 / Cartosat', resolution: '5 m/px' })
      },
      {
        name: 'region_2026.tif',
        url: IMAGES.changeAfter,
        modality: 'optical',
        timestamp: '2026-02-27',
        meta: meta({ sensor: 'Sentinel-2 / Cartosat', resolution: '5 m/px' })
      }
    ],
    query: 'Has the built-up area increased, decreased, or remained unchanged between these dates?'
  },
  {
    id: 'cross_modal',
    title: 'Optical + SAR Fusion',
    subtitle: 'Sentinel-2 MSI + Sentinel-1 SAR',
    icon: 'Layers',
    images: [
      {
        name: 'delta_optical.tif',
        url: IMAGES.opticalDelta,
        modality: 'optical',
        timestamp: '2026-03-02',
        meta: meta({ sensor: 'Sentinel-2 MSI' })
      },
      {
        name: 'delta_sar.tif',
        url: IMAGES.sarDelta,
        modality: 'sar',
        timestamp: '2026-03-03',
        meta: meta({ sensor: 'Sentinel-1 C-Band SAR', bands: 'VV,VH' })
      }
    ],
    query: 'Use the optical and SAR images together to identify built-up and water-covered regions.'
  },
  {
    id: 'flood',
    title: 'Flood Assessment (VQA)',
    subtitle: 'Sentinel-2 · Flood plain',
    icon: 'Waves',
    images: [
      {
        name: 'flood_plain.tif',
        url: IMAGES.flood,
        modality: 'optical',
        timestamp: '2026-06-11',
        meta: meta({ sensor: 'Sentinel-2 MSI' })
      }
    ],
    query: 'Which areas are inundated and roughly what fraction of the farmland is flooded?'
  }
];

export const SUGGESTED = {
  single: [
    'What land cover types are visible?',
    'How many distinct water bodies are visible?',
    'Describe the scene and major objects.',
    'Highlight the built-up / urban area.'
  ],
  pair_optical: [
    'What changed between these two dates?',
    'Has the built-up area increased, decreased, or remained unchanged?',
    'Estimate the percentage of vegetation lost.',
    'Where did major urban construction occur?'
  ],
  pair_modal: [
    'Use the optical and SAR images together to identify built-up and water-covered regions.',
    'What does SAR reveal that optical does not?',
    'Confirm the water extent using both modalities.',
    'Detect structures beneath thin cloud haze.'
  ]
};

export const REGION_COLORS: Record<string, { stroke: string; fill: string }> = {
  object: { stroke: '#00F0FF', fill: 'rgba(0,240,255,0.14)' },
  target: { stroke: '#FF7300', fill: 'rgba(255,115,0,0.18)' },
  change: { stroke: '#FF1744', fill: 'rgba(255,23,68,0.20)' },
  builtup: { stroke: '#FFB300', fill: 'rgba(255,179,0,0.18)' },
  water: { stroke: '#00E676', fill: 'rgba(0,230,118,0.16)' }
};
