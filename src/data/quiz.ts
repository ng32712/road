export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  scene?: string;
}

export const quizQuestions: QuizQuestion[] = [
  // Traffic Signs
  {
    id: 1,
    question: 'You approach an intersection with a STOP sign. No traffic is coming from either side. What do you do?',
    options: ['Slow down and proceed', 'Stop completely, then proceed when safe', 'Continue at the same speed'],
    correct: 1,
    explanation: 'A STOP sign requires a COMPLETE stop behind the stop line, regardless of whether traffic is visible. STOP ≠ SLOW DOWN.',
    category: 'signs',
    scene: '🛑 You see a red octagonal sign at an intersection.',
  },
  {
    id: 2,
    question: 'What does a yellow diamond-shaped sign indicate?',
    options: ['A regulation you must follow', 'A warning about conditions ahead', 'Information about a nearby place'],
    correct: 1,
    explanation: 'Yellow diamond signs are WARNING signs. They tell you something is changing ahead — a curve, crossing, or hazard.',
    category: 'signs',
  },
  {
    id: 3,
    question: 'You see a circular sign with a red ring and the number "40" inside. What does it mean?',
    options: ['Recommended speed is 40 km/h', 'Minimum speed is 40 km/h', 'Maximum speed allowed is 40 km/h'],
    correct: 2,
    explanation: 'A red ring around a number is a SPEED LIMIT sign. The number is the MAXIMUM speed allowed, not a recommendation.',
    category: 'signs',
  },
  {
    id: 4,
    question: 'What shape is the STOP sign?',
    options: ['Circle', 'Triangle', 'Octagon (8 sides)'],
    correct: 2,
    explanation: 'The STOP sign is the only octagonal (8-sided) sign on the road. Its unique shape makes it recognizable even from behind.',
    category: 'signs',
  },
  {
    id: 5,
    question: 'A blue square sign with a white "P" means:',
    options: ['No parking allowed', 'Authorized parking area', 'Police station ahead'],
    correct: 1,
    explanation: 'A blue square with a white "P" is an INFORMATION sign indicating an authorized parking area.',
    category: 'signs',
  },
  {
    id: 6,
    question: 'An upside-down red triangle means:',
    options: ['Stop completely', 'Give way / Yield', 'Road narrows ahead'],
    correct: 1,
    explanation: 'The upside-down red triangle is the GIVE WAY sign. Slow down and yield to traffic on the main road.',
    category: 'signs',
  },
  // Right of Way
  {
    id: 7,
    question: 'In Rwanda, vehicles drive on which side of the road?',
    options: ['Left side', 'Right side', 'Either side'],
    correct: 1,
    explanation: 'Rwanda drives on the RIGHT. This is fundamental to all right-of-way decisions.',
    category: 'rules',
  },
  {
    id: 8,
    question: 'At an unmarked intersection (no signs or signals), who has priority?',
    options: ['The larger vehicle', 'The vehicle coming from your right', 'The faster vehicle'],
    correct: 1,
    explanation: 'At unmarked intersections, priority goes to vehicles coming from your RIGHT. This is the default rule in Rwanda.',
    category: 'rules',
  },
  {
    id: 9,
    question: 'When approaching a roundabout, you must:',
    options: ['Speed up and enter first', 'Give way to traffic already in the roundabout', 'Honk to announce your arrival'],
    correct: 1,
    explanation: 'Traffic already in the roundabout has priority. Slow down, wait for a safe gap, then enter.',
    category: 'rules',
  },
  {
    id: 10,
    question: 'A pedestrian is waiting at a zebra crossing. You should:',
    options: ['Speed up to pass before they step on', 'Stop and let them cross', 'Honk to warn them'],
    correct: 1,
    explanation: 'Pedestrians on or waiting to enter a zebra crossing always have priority. Stop and let them cross safely.',
    category: 'rules',
  },
  {
    id: 11,
    question: 'An ambulance approaches with sirens and flashing lights. You should:',
    options: ['Continue at your speed', 'Move to the side and stop', 'Speed up to get out of the way'],
    correct: 1,
    explanation: 'Always yield to emergency vehicles with sirens or flashing lights. Move to the side of the road and stop safely.',
    category: 'rules',
  },
  // Speed & Distance
  {
    id: 12,
    question: 'What is the typical speed limit in urban areas in Rwanda?',
    options: ['30 km/h', '40-50 km/h', '80 km/h'],
    correct: 1,
    explanation: 'Urban areas in Rwanda typically have speed limits of 40-50 km/h. Near schools, it may be as low as 30 km/h.',
    category: 'speed',
  },
  {
    id: 13,
    question: 'What is the minimum safe following distance?',
    options: ['1 second', '2-3 seconds', 'As close as possible'],
    correct: 1,
    explanation: 'Keep at least a 2-second gap (3 seconds in rain or poor conditions). This gives you time to react if the vehicle ahead brakes suddenly.',
    category: 'speed',
  },
  {
    id: 14,
    question: 'When is overtaking NOT allowed?',
    options: ['On a straight road with clear visibility', 'On solid lines, bends, or near crossings', 'When the vehicle ahead is going slowly'],
    correct: 1,
    explanation: 'Never overtake on solid lines, bends, crests, or near crossings. Visibility must be sufficient to complete the maneuver safely.',
    category: 'speed',
  },
  {
    id: 15,
    question: 'In which direction should you overtake another vehicle?',
    options: ['On the right', 'On the left', 'Either side'],
    correct: 1,
    explanation: 'In Rwanda (right-hand traffic), you overtake on the LEFT of the vehicle ahead. Signal, check mirrors and blind spot, pass, return right.',
    category: 'speed',
  },
  // Night & Weather
  {
    id: 16,
    question: 'When must you use headlights?',
    options: ['Only in complete darkness', 'From sunset to sunrise', 'Only on highways'],
    correct: 1,
    explanation: 'Use headlights from sunset to sunrise. Also use them in rain, fog, or any condition with reduced visibility.',
    category: 'night',
  },
  {
    id: 17,
    question: 'When an oncoming vehicle approaches at night, you should:',
    options: ['Keep high beams on', 'Dip your headlights to low beam', 'Turn off your lights'],
    correct: 1,
    explanation: 'Dip your headlights when approaching oncoming traffic to avoid blinding the other driver. Use high beams only on dark, empty roads.',
    category: 'night',
  },
  {
    id: 18,
    question: 'Driving in heavy rain, you should:',
    options: ['Drive at the normal speed limit', 'Reduce speed and increase following distance', 'Use hazard lights while driving'],
    correct: 1,
    explanation: 'In rain, reduce speed and increase your following distance to at least 3 seconds. Roads become slippery and stopping distances increase.',
    category: 'night',
  },
  // Safe Habits
  {
    id: 19,
    question: 'Who must wear seatbelts in a vehicle?',
    options: ['Only the driver', 'Driver and front passenger', 'All passengers'],
    correct: 2,
    explanation: 'Seatbelts are mandatory for ALL passengers in Rwanda. Every person in the vehicle must be belted.',
    category: 'safety',
  },
  {
    id: 20,
    question: 'Using a handheld mobile phone while driving is:',
    options: ['Allowed at low speeds', 'Illegal in Rwanda', 'Only forbidden on highways'],
    correct: 1,
    explanation: 'Using a handheld mobile phone while driving is ILLEGAL in Rwanda. Use hands-free devices or pull over to make calls.',
    category: 'safety',
  },
  {
    id: 21,
    question: 'What is the blood alcohol limit for driving in Rwanda?',
    options: ['0.02%', '0.05%', '0.08%'],
    correct: 2,
    explanation: 'The blood alcohol limit in Rwanda is 0.08%. Exceeding this leads to fines, license suspension, and possible imprisonment.',
    category: 'safety',
  },
  {
    id: 22,
    question: 'Motorcycle riders and passengers must wear:',
    options: ['A reflective vest', 'A helmet', 'Gloves'],
    correct: 1,
    explanation: 'Helmets are MANDATORY for all motorcycle riders and passengers in Rwanda. The helmet must meet safety standards.',
    category: 'safety',
  },
  {
    id: 23,
    question: 'If your vehicle breaks down on a highway, you should place a warning triangle at least:',
    options: ['10 meters behind', '50 meters behind', '100 meters behind'],
    correct: 1,
    explanation: 'Place a warning triangle at least 50 meters behind your vehicle to give approaching drivers time to react.',
    category: 'safety',
  },
  {
    id: 24,
    question: 'Before changing lanes, you must:',
    options: ['Just turn the steering wheel', 'Check mirrors, signal, and check blind spot', 'Honk to warn others'],
    correct: 1,
    explanation: 'Always check mirrors, signal your intention, and check your blind spot by turning your head before changing lanes.',
    category: 'safety',
  },
  {
    id: 25,
    question: 'What does a solid white line on the road mean?',
    options: ['You can overtake if careful', 'Do not cross it to overtake', 'It marks a bus lane'],
    correct: 1,
    explanation: 'A solid white line means do NOT cross it to overtake. It indicates limited visibility ahead. SOLID LINE = INVISIBLE WALL.',
    category: 'markings',
  },
  {
    id: 26,
    question: 'A yellow criss-cross pattern at an intersection (box junction) means:',
    options: ['You can park here briefly', 'Do not enter unless your exit is clear', 'Pedestrians cross here'],
    correct: 1,
    explanation: 'A box junction (yellow criss-cross) means you must NOT enter unless your exit is clear. This prevents gridlock.',
    category: 'markings',
  },
  {
    id: 27,
    question: 'At a school zone sign, the speed limit is typically:',
    options: ['50 km/h', '40 km/h', '30 km/h'],
    correct: 2,
    explanation: 'Near schools, speed limits are typically reduced to 30 km/h to protect children who may be on or near the road.',
    category: 'signs',
  },
  {
    id: 28,
    question: 'The horn should be used:',
    options: ['To express frustration at slow drivers', 'Only to warn others of danger', 'Whenever you want right of way'],
    correct: 1,
    explanation: 'The horn should ONLY be used to warn others of danger. HORN ≠ RIGHT OF WAY. Avoid using it in residential areas at night.',
    category: 'rules',
  },
  {
    id: 29,
    question: 'When should you use your hazard lights?',
    options: ['While driving in rain', 'In emergencies or when broken down', 'When parking illegally'],
    correct: 1,
    explanation: 'Hazard lights are for emergencies, breakdowns, or to warn other drivers of a stationary hazard. Do not use them while driving normally.',
    category: 'safety',
  },
  {
    id: 30,
    question: 'What documents must you always carry while driving?',
    options: ['Only your license', 'License, registration, and insurance', 'Only insurance'],
    correct: 1,
    explanation: 'You must carry your driving license, vehicle registration, and proof of insurance at all times while driving in Rwanda.',
    category: 'safety',
  },
];

export function getShuffledQuestions(count: number, category?: string): QuizQuestion[] {
  let filtered = category
    ? quizQuestions.filter(q => q.category === category)
    : [...quizQuestions];
  
  // Shuffle
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  
  return filtered.slice(0, count);
}
