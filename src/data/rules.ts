export interface RoadRule {
  id: string;
  title: string;
  titleRw: string;
  summary: string;
  details: string[];
  keyPoint: string;
  icon: string;
}

export const roadRules: RoadRule[] = [
  {
    id: 'speed',
    title: 'Speed Limits',
    titleRw: 'Umuvuduko',
    summary: 'Understand speed limits and why they matter.',
    details: [
      'Speed limits are the legal MAXIMUM for ideal conditions.',
      'Urban areas: 40-50 km/h typically.',
      'Near schools and hospitals: 30 km/h.',
      'Highways: up to 80-100 km/h.',
      'Match your speed to rain, traffic, visibility, and road state.',
      'Slower is safer whenever conditions worsen.',
      'The number is a CEILING, not a goal.',
    ],
    keyPoint: 'THE NUMBER IS A CEILING, NOT A GOAL',
    icon: '🏎',
  },
  {
    id: 'right-of-way',
    title: 'Right of Way',
    titleRw: 'Uburenganzira bwo Kubanza',
    summary: 'Learn who should proceed first.',
    details: [
      'Rwanda drives on the RIGHT.',
      'Priority follows signs first (STOP, GIVE WAY).',
      'Then traffic already in intersections or roundabouts.',
      'Then vehicles coming from your right at unmarked crossings.',
      'At roundabouts: traffic already circulating has priority.',
      'Emergency vehicles with sirens always have priority.',
      'Pedestrians on zebra crossings always have priority.',
    ],
    keyPoint: 'RWANDA DRIVES ON THE RIGHT',
    icon: '➡',
  },
  {
    id: 'overtaking',
    title: 'Overtaking',
    titleRw: 'Guhita Imbere',
    summary: 'When overtaking is permitted and how to do it safely.',
    details: [
      'Overtake on the LEFT of the vehicle ahead.',
      'Only when the lane is clear far enough ahead.',
      'Never on solid lines, bends, crests, or near crossings.',
      'Signal, check mirrors and blind spot, pass, return right.',
      'Never overtake when a No Overtaking sign is displayed.',
      'Do not overtake on the right — that is the fast lane.',
    ],
    keyPoint: 'OVERTAKE ON THE LEFT, ONLY WHEN SAFE',
    icon: '⟶',
  },
  {
    id: 'roundabouts',
    title: 'Roundabouts',
    titleRw: 'Karufuru',
    summary: 'How to approach and navigate roundabouts.',
    details: [
      'Slow down on approach.',
      'GIVE WAY to traffic already circulating.',
      'Enter when there is a safe gap.',
      'Keep left of the central island.',
      'Signal right as you near your exit.',
      'Do not stop inside the roundabout unless necessary.',
    ],
    keyPoint: 'THE CIRCLE GOES FIRST',
    icon: '↻',
  },
  {
    id: 'parking',
    title: 'Parking',
    titleRw: 'Amategeko yo Guhagarara',
    summary: 'Basic stopping and parking rules.',
    details: [
      'Park in marked bays or off the carriageway.',
      'Park close to the curb.',
      'Never park on crossings, corners, bridges.',
      'Never park where you block visibility.',
      '"Stopping" with you at the wheel is different from "parking".',
      'Always engage the handbrake when parked.',
      'Turn off the engine and lock the vehicle.',
    ],
    keyPoint: 'NEVER PARK ON CROSSINGS OR CORNERS',
    icon: '🅿',
  },
  {
    id: 'safe-driving',
    title: 'Safe Driving',
    titleRw: 'Gutwara neza',
    summary: 'Habits that keep you safe every day.',
    details: [
      'Keep a 2+ second following gap (3 seconds in rain).',
      'Scan far ahead — anticipate problems early.',
      'Expect the unexpected from moto-taxis and pedestrians.',
      'Wear seatbelts every trip — all passengers.',
      'Never drive distracted, tired, or impaired.',
      'No handheld mobile phones while driving.',
      'Use headlights from sunset to sunrise.',
      'Dip headlights for oncoming traffic.',
      'Blood alcohol limit: 0.08%.',
    ],
    keyPoint: '2-SECOND GAP · SEATBELTS ALWAYS · NO PHONES',
    icon: '🛡',
  },
];

export interface RoadMarking {
  id: string;
  name: string;
  nameRw: string;
  description: string;
  rule: string;
  icon: string;
}

export const roadMarkings: RoadMarking[] = [
  {
    id: 'dashed-line',
    name: 'Dashed Centre Line',
    nameRw: 'Umurongo w\'Icyeru Ucitse',
    description: 'A broken white line separating lanes.',
    rule: 'You may cross it to overtake or turn — but only when the road ahead is clearly safe and no other sign or line forbids it.',
    icon: '- - - -',
  },
  {
    id: 'solid-line',
    name: 'Solid Centre Line',
    nameRw: 'Umurongo w\'Icyeru Uhoraho',
    description: 'A continuous white line separating lanes or marking the road edge.',
    rule: 'Do not cross it to overtake. Visibility is limited ahead — a bend, crest, or hazard is why the line is solid.',
    icon: '━━━━━',
  },
  {
    id: 'double-solid',
    name: 'Double Solid Lines',
    nameRw: 'Imirongo Ibiri Y\'umuhondo',
    description: 'Two parallel solid lines (yellow or white).',
    rule: 'No crossing, no overtaking, no U-turns — for either direction. Treat them like a wall.',
    icon: '═══',
  },
  {
    id: 'zebra',
    name: 'Zebra Crossing',
    nameRw: 'Ahanyura Abagenzi',
    description: 'White striped markings on the road.',
    rule: 'Pedestrians on the crossing have priority. Slow down on approach and stop for anyone crossing or waiting to cross.',
    icon: '▮ ▮ ▮ ▮',
  },
  {
    id: 'stop-line',
    name: 'Stop Line',
    nameRw: 'Umurongo wo Guhagarara',
    description: 'A thick white line at intersections.',
    rule: 'Your front wheels must stop BEFORE this line. Stopping beyond it defeats the sightlines the line protects.',
    icon: '████',
  },
  {
    id: 'lane-arrows',
    name: 'Lane Arrows',
    nameRw: 'Imyambi y\'Icyerekezo',
    description: 'Arrows painted on the road showing permitted directions.',
    rule: 'Follow the arrow for your lane: straight, left, right, or combinations. Choose your lane early — changing over a solid line is not allowed.',
    icon: '↑ ← →',
  },
  {
    id: 'box-junction',
    name: 'Box Junction',
    nameRw: 'Ahantu h\'Imimaro',
    description: 'A yellow criss-cross pattern at intersections.',
    rule: 'You must not enter unless your exit is clear. This prevents gridlock at busy intersections.',
    icon: '╳╳╳',
  },
  {
    id: 'hatched',
    name: 'Hatched Markings',
    nameRw: 'Imyandiko Iremereye',
    description: 'Diagonal lines within a bordered area.',
    rule: 'These separate traffic or indicate no-drive zones. Do not enter unless necessary for safety.',
    icon: '///',
  },
];
