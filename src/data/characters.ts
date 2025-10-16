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
    hp: 880,
    maxHp: 880,
    attack: 155,
    defense: 75,
    ability: 'Vampire Strike',
    abilityDesc: 'Наносит 220% урона и крадёт 50% нанесённого урона как HP',
    gradient: 'bg-gradient-to-br from-red-600 to-red-900',
    emoji: '🩸',
    energy: 0,
    maxEnergy: 3
  },
  {
    id: 'wizard',
    name: 'Wizard Cookie',
    hp: 720,
    maxHp: 720,
    attack: 165,
    defense: 60,
    ability: 'Magic Burst',
    abilityDesc: 'Наносит 180% урона всем врагам (AoE атака)',
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

export const getRandomBoss = (): Enemy => {
  const randomIndex = Math.floor(Math.random() * bossTypes.length);
  return { ...bossTypes[randomIndex] };
};