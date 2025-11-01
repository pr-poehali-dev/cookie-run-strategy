import { Character, Enemy } from '@/types/game';

export const initialCharacters: Character[] = [
  {
    id: 'gingerbrave',
    name: 'Gingerbrave',
    hp: 850,
    maxHp: 850,
    attack: 130,
    defense: 60,
    ability: 'Candy Rush',
    abilityDesc: 'Наносит 150% урона и восстанавливает 15% HP',
    gradient: 'cookie-gradient',
    emoji: '🍪',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'shadow-milk',
    name: 'Shadow Milk',
    hp: 850,
    maxHp: 850,
    attack: 140,
    defense: 65,
    ability: 'Dark Deceit',
    abilityDesc: 'Наносит 200% урона (требует 3 энергии)',
    gradient: 'shadow-gradient',
    emoji: '🌑',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    hp: 800,
    maxHp: 800,
    attack: 120,
    defense: 95,
    ability: 'Berry Heal',
    abilityDesc: 'Восстанавливает 40% HP всей команде',
    gradient: 'strawberry-gradient',
    emoji: '🍓',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    hp: 750,
    maxHp: 750,
    attack: 155,
    defense: 75,
    ability: 'Vampire Strike',
    abilityDesc: 'Наносит 200% урона и крадёт 50% нанесённого урона как HP',
    gradient: 'bg-gradient-to-br from-red-600 to-red-900',
    emoji: '🩸',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'wizard',
    name: 'Wizard Cookie',
    hp: 570,
    maxHp: 570,
    attack: 165,
    defense: 60,
    ability: 'Magic Burst',
    abilityDesc: 'Наносит 150% урона всем врагам (AoE атака)',
    gradient: 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600',
    emoji: '🧙',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'wind-archer',
    name: 'Wind Archer',
    hp: 550,
    maxHp: 550,
    attack: 195,
    defense: 50,
    ability: 'Wind Shot',
    abilityDesc: 'Наносит 240% критического урона одной цели (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-emerald-600',
    emoji: '🏹',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'sea-fairy',
    name: 'Sea Fairy Cookie',
    hp: 600,
    maxHp: 600,
    attack: 100,
    defense: 30,
    ability: 'Ocean Wave',
    abilityDesc: 'Наносит 120% урона всем врагам (AoE атака)',
    gradient: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400',
    emoji: '🧚',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'werewolf',
    name: 'Werewolf Cookie',
    hp: 600,
    maxHp: 600,
    attack: 95,
    defense: 55,
    ability: 'Howling Heal',
    abilityDesc: 'Наносит 120% урона всем врагам и лечит команду на 50% от урона',
    gradient: 'bg-gradient-to-br from-gray-700 via-purple-900 to-indigo-900',
    emoji: '🐺',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'metal-knight',
    name: 'Metal Knight Cookie',
    hp: 630,
    maxHp: 630,
    attack: 120,
    defense: 30,
    ability: 'Steel Strike',
    abilityDesc: 'Наносит 250% урона одному врагу (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-gray-400 via-slate-500 to-zinc-600',
    emoji: '⚔️',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'pale-lily',
    name: 'Pale Lily Cookie',
    hp: 600,
    maxHp: 600,
    attack: 60,
    defense: 25,
    ability: 'Garden Blessing',
    abilityDesc: 'Восстанавливает 200 HP всей команде (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100',
    emoji: '🌸',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'pale-garden-guard',
    name: 'Pale Garden Guard Cookie',
    hp: 610,
    maxHp: 610,
    attack: 120,
    defense: 30,
    ability: 'Guardian Strike',
    abilityDesc: 'Наносит 130% урона всем врагам и восстанавливает 100 HP себе (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-slate-300 via-gray-400 to-zinc-500',
    emoji: '🛡️',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'herb',
    name: 'Herb Cookie',
    hp: 630,
    maxHp: 630,
    attack: 45,
    defense: 10,
    ability: 'Nature\'s Gift',
    abilityDesc: 'Восстанавливает 130 HP всей команде каждый ход в течение 3 ходов (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-green-300 via-emerald-400 to-teal-500',
    emoji: '🌿',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'choco-chess',
    name: 'Choco Chess Cookie',
    hp: 700,
    maxHp: 700,
    attack: 100,
    defense: 45,
    ability: 'Chess Strike',
    abilityDesc: 'Наносит 200% урона одному врагу (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-amber-700 via-yellow-800 to-stone-900',
    emoji: '♟️',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'concierge',
    name: 'Concierge Cookie',
    hp: 640,
    maxHp: 640,
    attack: 95,
    defense: 30,
    ability: 'Service Bell',
    abilityDesc: 'Наносит 200% урона всем врагам, но теряет 20 HP за каждого врага (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-400',
    emoji: '🔔',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'eternal-sugar',
    name: 'Eternal Sugar Cookie',
    hp: 800,
    maxHp: 800,
    attack: 130,
    defense: 40,
    ability: 'Sweet Poison',
    abilityDesc: 'Отравляет всех противников на 3 хода (80 урона за тик) (требует 3 энергии)',
    gradient: 'bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500',
    emoji: '🍬',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'sugarfly',
    name: 'Sugarfly Cookie',
    hp: 750,
    maxHp: 750,
    attack: 95,
    defense: 50,
    ability: 'Healing Wings',
    abilityDesc: 'Восстанавливает всем союзникам по 120 HP раз в ход в течении 5 ходов',
    gradient: 'bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-400',
    emoji: '🦋',
    energy: 0,
    maxEnergy: 3
  }
];

export const allEnemyTypes: Enemy[] = [
  {
    id: 'small-cake',
    name: 'Small Cake',
    hp: 140,
    maxHp: 140,
    attack: 40,
    emoji: '🧁'
  },
  {
    id: 'cake-hound',
    name: 'Cake Hound',
    hp: 800,
    maxHp: 800,
    attack: 90,
    emoji: '🐕'
  },
  {
    id: 'cake-monster',
    name: 'Cake Monster',
    hp: 1000,
    maxHp: 1000,
    attack: 110,
    emoji: '🍰'
  },
  {
    id: 'candy-beast',
    name: 'Candy Beast',
    hp: 700,
    maxHp: 700,
    attack: 85,
    emoji: '🦁'
  },
  {
    id: 'killer-cake',
    name: 'Killer Cake',
    hp: 350,
    maxHp: 350,
    attack: 60,
    emoji: '🔪'
  },
  {
    id: 'cake-titan',
    name: 'Cake Titan',
    hp: 900,
    maxHp: 900,
    attack: 35,
    emoji: '🗿'
  }
];

export const getRandomEnemies = (): Enemy[] => {
  const shuffled = [...allEnemyTypes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((enemy, index) => ({
    ...enemy,
    id: `${enemy.id}-${index}`
  }));
};

export const getRandomEnemy = (): Enemy => {
  const randomIndex = Math.floor(Math.random() * allEnemyTypes.length);
  return { ...allEnemyTypes[randomIndex], id: `${allEnemyTypes[randomIndex].id}-0` };
};

export const bossTypes: Enemy[] = [
  {
    id: 'cake-witch',
    name: 'Cake Witch',
    hp: 1300,
    maxHp: 1300,
    attack: 105,
    emoji: '🧙‍♀️'
  },
  {
    id: 'king-pie',
    name: 'King Pie',
    hp: 1800,
    maxHp: 1800,
    attack: 70,
    emoji: '👑'
  },
  {
    id: 'the-great-destroyer',
    name: 'The Great Destroyer',
    hp: 1500,
    maxHp: 1500,
    attack: 85,
    emoji: '💀'
  }
];

export const extremeBoss: Enemy = {
  id: 'sky-titan',
  name: 'Титан Небес',
  hp: 2700,
  maxHp: 2700,
  attack: 140,
  emoji: '⚡'
};

export const paleGardenEnemies: Enemy[] = [
  {
    id: 'pale-fly',
    name: 'Бледная муха',
    hp: 600,
    maxHp: 600,
    attack: 115,
    emoji: '🦟'
  },
  {
    id: 'corrupted-dough',
    name: 'Испорченное тесто',
    hp: 300,
    maxHp: 300,
    attack: 220,
    emoji: '🧟'
  },
  {
    id: 'shadow',
    name: 'Тень',
    hp: 800,
    maxHp: 800,
    attack: 80,
    emoji: '👤'
  },
  {
    id: 'garden-guardian',
    name: 'Страж сада',
    hp: 750,
    maxHp: 750,
    attack: 100,
    emoji: '🗿'
  }
];

export const getRandomBoss = (): Enemy => {
  const randomIndex = Math.floor(Math.random() * bossTypes.length);
  return { ...bossTypes[randomIndex] };
};

export const getRandomPaleGardenEnemies = (): Enemy[] => {
  const shuffled = [...paleGardenEnemies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map((enemy, index) => ({
    ...enemy,
    id: `${enemy.id}-${index}`
  }));
};

export const chessEnemies: Enemy[] = [
  {
    id: 'queen',
    name: 'Ферзь',
    hp: 600,
    maxHp: 600,
    attack: 110,
    emoji: '♕'
  },
  {
    id: 'knight',
    name: 'Конь',
    hp: 600,
    maxHp: 600,
    attack: 150,
    emoji: '♘'
  },
  {
    id: 'king',
    name: 'Король',
    hp: 900,
    maxHp: 900,
    attack: 100,
    emoji: '♔'
  },
  {
    id: 'pawn',
    name: 'Пешка',
    hp: 500,
    maxHp: 500,
    attack: 85,
    emoji: '♙'
  },
  {
    id: 'rook',
    name: 'Ладья',
    hp: 700,
    maxHp: 700,
    attack: 100,
    emoji: '♖'
  }
];

export const getRandomChessEnemies = (): Enemy[] => {
  const shuffled = [...chessEnemies].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map((enemy, index) => ({
    ...enemy,
    id: `${enemy.id}-${index}`
  }));
};