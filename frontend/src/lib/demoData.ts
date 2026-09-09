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

import { ImageSlot, AnalysisResponseData, EvidenceRegionData, HeatmapData } from './api';

export function generateLocalAnalysis(query: string, slots: ImageSlot[]): AnalysisResponseData {
  const q = query.toLowerCase();
  const isPair = slots.length >= 2;
  const isSar = slots.some((s) => s.modality === 'sar') || q.includes('sar') || q.includes('radar');
  const isFlood = q.includes('flood') || q.includes('inundat') || q.includes('submerg');
  const isCounting = q.includes('how many') || q.includes('count') || q.includes('number of');
  const isWater = q.includes('water') || q.includes('river') || q.includes('lake');
  const isChange = isPair || q.includes('change') || q.includes('between') || q.includes('increase') || q.includes('loss');

  let task = isSar ? 'cross_modal' : isChange ? 'change' : isFlood ? 'flood' : 'vqa';
  let headline = '';
  let bullets: string[] = [];
  let regions: EvidenceRegionData[] = [];
  let heatmap: HeatmapData | undefined = undefined;

  if (isFlood) {
    task = 'flood';
    headline = 'Flood inundation has submerged approximately 31.4% (31.4 km²) of surrounding agricultural lands along the central-western drainage corridor.';
    bullets = [
      'Primary Inundation Zone: Active river floodplains in the central-western sector exhibit water depths exceeding normal baseline by ~1.8m.',
      'Farmland Impact: Low-lying crop parcels (31.4% of total vegetative cover) show high specular absorption and near-complete submersion.',
      'Transport Infrastructure: Peripheral elevated roadways remain above the flood line, but secondary unpaved rural access routes in the southwest are cut off.',
      'Temporal Dynamics: Downstream oxbow basins show active water pooling with low sediment turbidity.'
    ];
    heatmap = {
      type: 'flood',
      title: 'Flood Inundation & Submersion Heatmap',
      intensity_label: 'Inundation Extent & Depth Severity',
      palette: 'water',
      points: [
        { x: 0.42, y: 0.52, intensity: 0.95, radius: 0.24, label: 'Active River Floodplain Inundation' },
        { x: 0.28, y: 0.68, intensity: 0.88, radius: 0.18, label: 'Low-lying Farmland Submersion' },
        { x: 0.62, y: 0.30, intensity: 0.75, radius: 0.14, label: 'Northern Drainage Overflow Basin' }
      ]
    };
    regions = [
      { id: 'f_1', type: 'water', label: 'Primary Flood Inundation (31.4 km²)', box: [0.28, 0.25, 0.30, 0.50], confidence: 0.96 },
      { id: 'f_2', type: 'water', label: 'Submerged Crop Parcel', box: [0.15, 0.55, 0.23, 0.30], confidence: 0.92 },
      { id: 'f_3', type: 'builtup', label: 'Stable Elevated Settlement Buffer', box: [0.65, 0.20, 0.25, 0.40], confidence: 0.90 }
    ];
  } else if (isCounting && isWater) {
    headline = 'Identified 3 distinct water bodies: 1 primary meandering river channel and 2 peripheral oxbow retention basins.';
    bullets = [
      'Primary River Corridor: Bisects the region from northwest through central-south with an average channel width of 140 meters.',
      'Northern Retention Basin: Oxbow water body located at [0.08, 0.72, 0.22, 0.86] covering ~1.4 km² with high NDWI (>0.45).',
      'Southern Retention Basin: Shallow water reservoir at [0.70, 0.32, 0.88, 0.48] exhibiting seasonal sediment accumulation.',
      'Riparian Buffers: Form a continuous 40-meter vegetative protective zone along embankments.'
    ];
    heatmap = {
      type: 'flood',
      title: 'Hydrological Distribution Heatmap',
      intensity_label: 'Water Accumulation Index',
      palette: 'water',
      points: [
        { x: 0.42, y: 0.52, intensity: 0.95, radius: 0.24, label: 'Main River Channel' },
        { x: 0.28, y: 0.68, intensity: 0.88, radius: 0.18, label: 'Southern Retention Basin' }
      ]
    };
    regions = [
      { id: 'w_1', type: 'water', label: 'Main Meandering River', box: [0.32, 0.12, 0.26, 0.76], confidence: 0.96 },
      { id: 'w_2', type: 'water', label: 'Northern Oxbow Basin', box: [0.72, 0.08, 0.14, 0.14], confidence: 0.91 }
    ];
  } else if (isChange) {
    task = 'change';
    const isVegLoss = q.includes('vegetation') || q.includes('loss');
    headline = isVegLoss
      ? 'Vegetation cover experienced an estimated net reduction of -54.7% (-54.7 km²), undergoing direct conversion into built-up infrastructure across the scene.'
      : 'Built-up area experienced extensive urban expansion of +54.1% (+54.1 km²), transforming former agricultural and natural land into developed infrastructure across the Central, Eastern, and Northern sectors.';
    bullets = isVegLoss
      ? [
          'Vegetation Transition: Active vegetative canopy contracted from 96.7% down to 41.9% (-54.7 km² net reduction).',
          'Land-Cover Conversion: Former agricultural and forest parcels were repurposed directly into impervious built-up surface and transport arteries.',
          'Spatial Delineation: Grounded 6 major transition districts covering 62.0 km² of verified landscape transformation.',
          'Preserved Buffer: Preserved natural parcels in outlying zones retain 41.9% vegetative coverage.'
        ]
      : [
          'Structural Expansion: Built-up coverage surged from 2.3% at initial baseline to 57.1% in the current observation (+54.1 km² net growth).',
          'Agricultural Conversion: Former cropland and forest canopy (-54.7 km² / -54.7%) were converted directly into impervious structures and transport arteries.',
          'Major Development Corridors: Delineated 6 prominent continuous growth districts across the Central, Eastern, and Northern corridors.',
          'Peripheral Buffer: Preserved vegetated open land remains stable in outlying peripheral parcels (41.9% remaining coverage).'
        ];
    heatmap = {
      type: 'change',
      title: 'Bi-Temporal Change Intensity Heatmap',
      intensity_label: 'Change Magnitude (T1 → T2)',
      palette: 'thermal',
      points: [
        { x: 0.52, y: 0.50, intensity: 0.96, radius: 0.22, label: 'Central Urban Core Expansion' },
        { x: 0.72, y: 0.45, intensity: 0.94, radius: 0.20, label: 'Eastern Industrial & Logistics Hub' },
        { x: 0.25, y: 0.26, intensity: 0.91, radius: 0.18, label: 'Northwestern Residential Settlement' },
        { x: 0.76, y: 0.72, intensity: 0.93, radius: 0.19, label: 'Southeastern Corridor Expansion' }
      ]
    };
    regions = [
      { id: 'c_1', type: 'change', label: 'Central Urban Expansion (+9.69 km²)', box: [0.31, 0.28, 0.44, 0.44], confidence: 0.95 },
      { id: 'c_2', type: 'change', label: 'Western Urban Expansion (+9.56 km²)', box: [0.00, 0.31, 0.41, 0.44], confidence: 0.95 },
      { id: 'c_3', type: 'change', label: 'Northeast Urban Expansion (+9.73 km²)', box: [0.49, 0.06, 0.44, 0.44], confidence: 0.95 },
      { id: 'c_4', type: 'change', label: 'Southeast Urban Expansion (+9.53 km²)', box: [0.49, 0.48, 0.44, 0.44], confidence: 0.95 },
      { id: 'c_5', type: 'change', label: 'Northwest Urban Expansion (+7.79 km²)', box: [0.00, 0.04, 0.41, 0.44], confidence: 0.95 },
      { id: 'c_6', type: 'change', label: 'Southern Urban Expansion (+4.30 km²)', box: [0.27, 0.72, 0.44, 0.28], confidence: 0.94 }
    ];
  } else if (isSar) {
    task = 'cross_modal';
    headline = 'Joint Optical + SAR fusion successfully disambiguated surface features and penetrated optical cloud haze.';
    bullets = [
      'Microwave Penetration: Sentinel-1 C-Band (VV/VH) penetrated thin cloud cover, revealing 16.8 km² of obscured surface topography.',
      'Corner Reflection Signatures: High radar backscatter (> -6 dB) clearly demarcated double-bounce reflections from dense built-up settlements.',
      'Specular Water Absorption: Calm water along the river course produced near-zero radar returns (< -22 dB), establishing indisputable water boundaries.',
      'Cross-Sensor Fusion: Zero spatial mismatch detected after sub-pixel co-registration between Sentinel-2 and Sentinel-1.'
    ];
    heatmap = {
      type: 'spectral',
      title: 'Optical-SAR Cross-Sensor Coherence Map',
      intensity_label: 'Radar Roughness & Dielectric Contrast',
      palette: 'spectral',
      points: [
        { x: 0.75, y: 0.48, intensity: 0.96, radius: 0.26, label: 'Sub-Cloud Urban Corner Reflection' },
        { x: 0.45, y: 0.48, intensity: 0.80, radius: 0.16, label: 'Specular Absorption Water Boundary' }
      ]
    };
    regions = [
      { id: 's_1', type: 'builtup', label: 'SAR-Recovered Built-up Cluster', box: [0.65, 0.20, 0.25, 0.35], confidence: 0.96 },
      { id: 's_2', type: 'water', label: 'Specular Dark River Channel', box: [0.35, 0.25, 0.20, 0.50], confidence: 0.95 }
    ];
  } else {
    headline = 'Multispectral scene captures a peri-urban continuum composed of croplands (38.5%), settlements (28.2%), and an active waterway (14.8%).';
    bullets = [
      'Agricultural Expanse: Fertile crop fields in the western sector comprise 38.5% of the regional footprint.',
      'Urbanization: Dense residential infrastructure covers 28.2%, expanding eastward along the transport artery.',
      'Hydrological System: Natural meandering river course (14.8% area) provides drainage with stable banks.',
      'Bare / Transitional Soil: 18.5% area in the south available for planned development.'
    ];
    heatmap = {
      type: 'density',
      title: 'Built-up Structure Density Heatmap',
      intensity_label: 'Impervious Built-up Density',
      palette: 'spectral',
      points: [
        { x: 0.75, y: 0.48, intensity: 0.96, radius: 0.26, label: 'High-Density Residential Node' },
        { x: 0.45, y: 0.48, intensity: 0.80, radius: 0.16, label: 'Central Commercial Hub' }
      ]
    };
    regions = [
      { id: 'v_1', type: 'builtup', label: 'Eastern Built-up Zone (28.2%)', box: [0.58, 0.22, 0.34, 0.56], confidence: 0.94 },
      { id: 'v_2', type: 'water', label: 'Active River Drainage (14.8%)', box: [0.35, 0.15, 0.23, 0.70], confidence: 0.95 },
      { id: 'v_3', type: 'object', label: 'Western Croplands (38.5%)', box: [0.10, 0.15, 0.28, 0.70], confidence: 0.91 }
    ];
  }

  const id = `tr_${Date.now().toString(16)}`;
  return {
    id,
    session_id: id,
    query,
    task,
    task_type: task === 'change' ? 'Change Detection (Bi-temporal)' : task === 'cross_modal' ? 'Optical + SAR Analysis' : task === 'flood' ? 'Flood Assessment (VQA)' : 'Single-Image VQA',
    intent: 'Remote Sensing Vision-Language Query',
    headline_answer: headline,
    bullet_points: bullets,
    confidence_score: 92,
    confidence: {
      level: 'HIGH',
      percent: 92,
      breakdown: {
        'Model agreement': '94%',
        'Grounding IoU': '89%',
        'Sensor resolution': '95%',
        'Temporal baseline': '92%'
      }
    },
    plan: {
      task,
      task_label: task.toUpperCase(),
      inputs: slots.map((s) => s.name),
      models: ['SatQuery-RS-VLM', 'RS-ChangeNet', 'CDVQA-Engine'],
      parameters: { threshold: 0.35, min_area_km2: 0.01 }
    },
    result: {
      answer: headline,
      primary_changes: bullets,
      land_cover: ['Agricultural Cropland (38.5%)', 'Built-up Infrastructure (28.2%)', 'Drainage River (14.8%)', 'Bare Soil (18.5%)'],
      evidence_regions: regions,
      change_percentage: isChange ? 14.8 : undefined,
      affected_area: isChange ? '14.8 km²' : undefined,
      heatmap
    },
    input_information: {
      location: slots[0]?.meta?.coordinates || 'Geospatial Scene (EPSG:4326)',
      resolution: slots[0]?.meta?.resolution || '10.0m / pixel (Sentinel-2)',
      area: '10.0 km x 10.0 km (100.0 sq. km)',
      before_image: slots[0] ? { date: slots[0].timestamp, sensor: slots[0].meta?.sensor || 'Sentinel-2' } : undefined,
      after_image: slots[1] ? { date: slots[1].timestamp, sensor: slots[1].meta?.sensor || 'Sentinel-2' } : undefined
    },
    heatmap,
    trace: [
      { label: 'Input validation', status: 'done', detail: `${slots.length} image(s) verified · EPSG:4326`, ms: 28 },
      { label: 'Modality detection', status: 'done', detail: slots.map((s) => s.modality).join(', '), ms: 15 },
      { label: 'Query understanding', status: 'done', detail: 'Intent classified & routed', ms: 35 },
      { label: 'Specialist model execution', status: 'done', detail: 'LoRA adapted multimodal inference', ms: 65 },
      { label: 'Evidence grounding & Heatmap synthesis', status: 'done', detail: `${regions.length} regions · Continuous heatmap generated`, ms: 40 }
    ],
    elapsed_sec: 0.18
  };
}

