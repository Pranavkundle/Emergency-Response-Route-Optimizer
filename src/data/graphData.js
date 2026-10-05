/**
 * Simulated road network for academic demonstration only.
 * This does not represent real roads or geographic locations.
 */

export const GRAPH_VIEWBOX = { width: 900, height: 520 }

export const nodes = [
  { id: 'accident', name: 'Accident Site', x: 70, y: 400 },
  { id: 'west_junction', name: 'West Junction', x: 150, y: 340 },
  { id: 'main_junction', name: 'Main Junction', x: 220, y: 400 },
  { id: 'south_junction', name: 'South Junction', x: 220, y: 480 },
  { id: 'park', name: 'City Park', x: 150, y: 240 },
  { id: 'fire_station', name: 'Fire Station', x: 260, y: 260 },
  { id: 'bus_stand', name: 'Bus Stand', x: 320, y: 320 },
  { id: 'market', name: 'Market', x: 340, y: 220 },
  { id: 'north_junction', name: 'North Junction', x: 400, y: 160 },
  { id: 'city_center', name: 'City Center', x: 400, y: 360 },
  { id: 'police', name: 'Police Station', x: 320, y: 450 },
  { id: 'school', name: 'School', x: 480, y: 440 },
  { id: 'railway', name: 'Railway Station', x: 500, y: 240 },
  { id: 'college', name: 'College', x: 540, y: 360 },
  { id: 'stadium', name: 'Stadium', x: 580, y: 180 },
  { id: 'east_junction', name: 'East Junction', x: 620, y: 320 },
  { id: 'hospital_b', name: 'Hospital B', x: 680, y: 240 },
  { id: 'industrial', name: 'Industrial Area', x: 620, y: 460 },
  { id: 'lake_rd', name: 'Lake Road', x: 500, y: 490 },
  { id: 'hospital_a', name: 'Hospital A', x: 780, y: 380 },
]

/** Undirected roads; each entry is one road segment. */
export const edges = [
  { source: 'accident', target: 'west_junction', weight: 3, blocked: false },
  { source: 'accident', target: 'main_junction', weight: 2, blocked: false },
  { source: 'west_junction', target: 'park', weight: 4, blocked: false },
  { source: 'west_junction', target: 'bus_stand', weight: 5, blocked: false },
  { source: 'main_junction', target: 'south_junction', weight: 2, blocked: false },
  { source: 'main_junction', target: 'city_center', weight: 8, blocked: false },
  { source: 'park', target: 'fire_station', weight: 3, blocked: false },
  { source: 'fire_station', target: 'market', weight: 4, blocked: false },
  { source: 'fire_station', target: 'bus_stand', weight: 3, blocked: false },
  { source: 'bus_stand', target: 'city_center', weight: 4, blocked: false },
  { source: 'bus_stand', target: 'police', weight: 5, blocked: false },
  { source: 'market', target: 'north_junction', weight: 3, blocked: false },
  { source: 'market', target: 'railway', weight: 6, blocked: false },
  { source: 'north_junction', target: 'stadium', weight: 4, blocked: false },
  { source: 'north_junction', target: 'city_center', weight: 5, blocked: false },
  { source: 'city_center', target: 'college', weight: 4, blocked: false },
  { source: 'city_center', target: 'school', weight: 3, blocked: false },
  { source: 'city_center', target: 'east_junction', weight: 7, blocked: false },
  { source: 'police', target: 'south_junction', weight: 2, blocked: false },
  { source: 'police', target: 'school', weight: 4, blocked: false },
  { source: 'school', target: 'lake_rd', weight: 3, blocked: false },
  { source: 'school', target: 'industrial', weight: 5, blocked: false },
  { source: 'railway', target: 'stadium', weight: 3, blocked: false },
  { source: 'railway', target: 'college', weight: 5, blocked: false },
  { source: 'railway', target: 'hospital_b', weight: 4, blocked: false },
  { source: 'college', target: 'east_junction', weight: 3, blocked: false },
  { source: 'stadium', target: 'hospital_b', weight: 5, blocked: false },
  { source: 'east_junction', target: 'hospital_a', weight: 4, blocked: false },
  { source: 'east_junction', target: 'hospital_b', weight: 6, blocked: false },
  { source: 'east_junction', target: 'industrial', weight: 4, blocked: false },
  { source: 'lake_rd', target: 'industrial', weight: 4, blocked: false },
  { source: 'industrial', target: 'hospital_a', weight: 5, blocked: false },
  { source: 'hospital_b', target: 'hospital_a', weight: 8, blocked: false },
  { source: 'south_junction', target: 'police', weight: 3, blocked: false },
  { source: 'main_junction', target: 'west_junction', weight: 3, blocked: false },
]

export const DEFAULT_START = 'accident'
export const DEFAULT_DEST = 'hospital_a'
