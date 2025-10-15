import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  ability: string;
  abilityDesc: string;
  gradient: string;
  emoji: string;
  energy: number;
  maxEnergy: number;
}

interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  emoji: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'characters' | 'teamSelect' | 'heroSelect' | 'battle' | 'duel'>('menu');
  const [activeTab, setActiveTab] = useState<'characters' | 'battle'>('characters');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleActive, setBattleActive] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number[]>([0, 0, 0]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [battleMode, setBattleMode] = useState<'3v3' | '1v1'>('3v3');

  const initialCharacters: Character[] = [
    {
      id: 'gingerbrave',
      name: 'Gingerbrave',
      hp: 950,
      maxHp: 950,
      attack: 140,
      defense: 85,
      ability: 'Candy Rush',
      abilityDesc: 'Наносит 200% урона и восстанавливает 15% HP',
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
      attack: 180,
      defense: 65,
      ability: 'Dark Deceit',
      abilityDesc: 'Наносит 250% урона',
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
      hp: 650,
      maxHp: 650,
      attack: 195,
      defense: 50,
      ability: 'Wind Shot',
      abilityDesc: 'Наносит 280% критического урона одной цели',
      gradient: 'bg-gradient-to-br from-teal-400 via-cyan-500 to-emerald-600',
      emoji: '🏹',
      energy: 0,
      maxEnergy: 3
    }
  ];

  const allEnemyTypes: Enemy[] = [
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

  const getRandomEnemies = () => {
    const shuffled = [...allEnemyTypes].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map((enemy, index) => ({
      ...enemy,
      id: `${enemy.id}-${index}`
    }));
  };

  const getRandomEnemy = () => {
    const randomIndex = Math.floor(Math.random() * allEnemyTypes.length);
    return { ...allEnemyTypes[randomIndex], id: `${allEnemyTypes[randomIndex].id}-0` };
  };

  const [team, setTeam] = useState<Character[]>(initialCharacters);
  const [enemies, setEnemies] = useState<Enemy[]>(getRandomEnemies());

  const startBattle = () => {
    const selectedChars = initialCharacters.filter(c => selectedTeam.includes(c.id));
    setTeam(JSON.parse(JSON.stringify(selectedChars)));
    const randomEnemies = getRandomEnemies();
    setEnemies(randomEnemies);
    setEnergy(selectedChars.map(() => 0));
    setBattleLog([`⚔️ Командная битва началась! Враги: ${randomEnemies.map(e => e.name).join(', ')}`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('battle');
  };

  const startDuel = () => {
    if (!selectedHero) return;
    const hero = initialCharacters.find(c => c.id === selectedHero);
    if (!hero) return;
    
    setTeam([JSON.parse(JSON.stringify(hero))]);
    const randomEnemy = getRandomEnemy();
    setEnemies([randomEnemy]);
    setEnergy([0]);
    setBattleLog([`⚔️ Дуэль началась! ${hero.name} против ${randomEnemy.name}!`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('duel');
  };

  const performAction = (useAbility: boolean) => {
    if (selectedCharIndex === null || selectedTarget === null || !battleActive) return;

    const newTeam = [...team];
    const newEnemies = [...enemies];
    const newEnergy = [...energy];
    const character = newTeam[selectedCharIndex];
    const target = newEnemies[selectedTarget];
    const newLog = [...battleLog];

    if (character.hp <= 0) {
      newLog.push(`${character.name} не может атаковать!`);
      setBattleLog(newLog);
      return;
    }

    if (useAbility) {
      if (newEnergy[selectedCharIndex] < 3) {
        newLog.push(`⚡ ${character.name}: недостаточно энергии! Нужно: 3, есть: ${newEnergy[selectedCharIndex]}`);
        setBattleLog(newLog);
        return;
      }

      newEnergy[selectedCharIndex] = 0;

      if (character.id === 'gingerbrave') {
        const damage = Math.floor(character.attack * 2);
        target.hp = Math.max(0, target.hp - damage);
        const heal = Math.floor(character.maxHp * 0.15);
        character.hp = Math.min(character.maxHp, character.hp + heal);
        newLog.push(`💥 ${character.name} использует ${character.ability}! Урон: ${damage}, HP+${heal}`);
      } else if (character.id === 'shadow-milk') {
        const damage = Math.floor(character.attack * 2.5);
        target.hp = Math.max(0, target.hp - damage);
        newLog.push(`🌟 ${character.name} использует ${character.ability}! Критический урон: ${damage}!`);
      } else if (character.id === 'strawberry') {
        const heal = Math.floor(character.maxHp * 0.4);
        newTeam.forEach(char => {
          if (char.hp > 0) {
            char.hp = Math.min(char.maxHp, char.hp + heal);
          }
        });
        newLog.push(`💚 ${character.name} использует ${character.ability}! Команда восстановила ${heal} HP!`);
      } else if (character.id === 'red-velvet') {
        const damage = Math.floor(character.attack * 2.2);
        const actualDamage = Math.min(damage, target.hp);
        target.hp = Math.max(0, target.hp - damage);
        const vampHeal = Math.floor(actualDamage * 0.5);
        character.hp = Math.min(character.maxHp, character.hp + vampHeal);
        newLog.push(`🩸 ${character.name} использует ${character.ability}! Урон: ${damage}, вампиризм: ${vampHeal} HP!`);
      } else if (character.id === 'wizard') {
        const damage = Math.floor(character.attack * 1.8);
        let totalDamage = 0;
        newEnemies.forEach(enemy => {
          if (enemy.hp > 0) {
            const actualDmg = Math.min(damage, enemy.hp);
            enemy.hp = Math.max(0, enemy.hp - damage);
            totalDamage += actualDmg;
          }
        });
        newLog.push(`✨ ${character.name} использует ${character.ability}! AoE урон: ${damage} всем врагам!`);
      } else if (character.id === 'wind-archer') {
        const damage = Math.floor(character.attack * 2.8);
        target.hp = Math.max(0, target.hp - damage);
        newLog.push(`🏹 ${character.name} использует ${character.ability}! КРИТИЧЕСКИЙ урон: ${damage}!`);
      }
    } else {
      const damage = Math.max(1, Math.floor(character.attack * 0.8));
      target.hp = Math.max(0, target.hp - damage);
      newEnergy[selectedCharIndex] = Math.min(3, newEnergy[selectedCharIndex] + 1);
      newLog.push(`⚔️ ${character.name} атакует ${target.name}! Урон: ${damage} (+1 ⚡)`);
    }

    setTeam(newTeam);
    setEnemies(newEnemies);
    setEnergy(newEnergy);
    setBattleLog(newLog);
    setSelectedCharIndex(null);
    setSelectedTarget(null);

    const aliveEnemies = newEnemies.filter(e => e.hp > 0);
    if (aliveEnemies.length === 0) {
      newLog.push('🎉 ПОБЕДА! Все враги повержены!');
      setBattleActive(false);
      setBattleLog(newLog);
      return;
    }

    setTimeout(() => {
      enemyTurn(newTeam, newEnemies, newLog);
    }, 1000);
  };

  const enemyTurn = (currentTeam: Character[], currentEnemies: Enemy[], currentLog: string[]) => {
    const newLog = [...currentLog];
    const aliveEnemies = currentEnemies.filter(e => e.hp > 0);
    const aliveHeroes = currentTeam.filter(c => c.hp > 0);

    if (aliveHeroes.length === 0) {
      newLog.push('💀 ПОРАЖЕНИЕ! Вся команда пала в бою...');
      setBattleActive(false);
      setBattleLog(newLog);
      setTeam([...currentTeam]);
      return;
    }

    aliveEnemies.forEach(enemy => {
      const targetIndex = Math.floor(Math.random() * aliveHeroes.length);
      const target = aliveHeroes[targetIndex];
      const damage = Math.max(1, enemy.attack - Math.floor(target.defense * 0.3));
      target.hp = Math.max(0, target.hp - damage);
      newLog.push(`${enemy.emoji} ${enemy.name} атакует ${target.name}! Урон: ${damage}`);
    });

    setTeam([...currentTeam]);
    setBattleLog(newLog);

    const stillAlive = currentTeam.filter(c => c.hp > 0);
    if (stillAlive.length === 0) {
      newLog.push('💀 ПОРАЖЕНИЕ! Вся команда пала в бою...');
      setBattleActive(false);
      setBattleLog(newLog);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100 p-4">
      {currentView === 'menu' && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 mb-4 drop-shadow-lg">
              Cookie Run Kingdom
            </h1>
            <p className="text-2xl text-amber-800 font-semibold">Командная стратегия 🍪</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setActiveTab('characters')}
              className={`h-16 px-8 text-xl font-bold rounded-2xl transition-all ${
                activeTab === 'characters'
                  ? 'bg-pink-500 text-white game-shadow scale-105'
                  : 'bg-white text-pink-500 border-3 border-pink-500'
              }`}
            >
              <Icon name="Users" className="mr-2" size={24} />
              Персонажи
            </Button>
            <Button
              onClick={() => setActiveTab('battle')}
              className={`h-16 px-8 text-xl font-bold rounded-2xl transition-all ${
                activeTab === 'battle'
                  ? 'bg-orange-500 text-white game-shadow scale-105'
                  : 'bg-white text-orange-500 border-3 border-orange-500'
              }`}
            >
              <Icon name="Swords" className="mr-2" size={24} />
              Бой
            </Button>
          </div>

          {activeTab === 'characters' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-amber-800 mb-2">Коллекция героев</h2>
                <p className="text-lg text-amber-600">Всего персонажей: {initialCharacters.length}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {initialCharacters.map((char) => (
                  <Card
                    key={char.id}
                    className="overflow-hidden border-4 border-amber-600 game-shadow hover:scale-105 transition-all rounded-3xl group"
                  >
                    <div className={`${char.gradient} p-8 text-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                      <div className="text-9xl mb-4 transform group-hover:scale-110 transition-transform">{char.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {char.name}
                      </h3>
                      <div className="flex justify-center gap-3 text-white/90 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          ⚔️ {char.attack}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          🛡️ {char.defense}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 bg-white space-y-4">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-xl border-2 border-red-200">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-red-700">❤️ Здоровье</span>
                          <span className="text-2xl font-bold text-red-600">{char.hp}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-4 rounded-2xl border-3 border-purple-400">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-2xl">✨</span>
                          <div className="flex-1">
                            <p className="font-bold text-purple-900 text-base mb-1">{char.ability}</p>
                            <p className="text-sm text-purple-700 leading-relaxed">{char.abilityDesc}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t-2 border-purple-300">
                          <span className="text-xs text-purple-600 font-semibold">⚡ Требует 3 энергии</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'battle' && (
            <div className="max-w-6xl mx-auto animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-amber-800 mb-3">⚔️ Выбор режима боя</h2>
                <p className="text-xl text-amber-600">Выбери подходящий режим и вступи в битву!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden border-4 border-amber-600 game-shadow hover:scale-105 transition-all rounded-3xl group cursor-pointer">
                  <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                    <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">👥</div>
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Командный бой</h3>
                    <p className="text-xl text-white/90 font-semibold">3 на 3</p>
                  </div>

                  <div className="p-6 bg-white space-y-4">
                    <p className="text-center text-lg text-amber-700 font-semibold">
                      Собери команду из 3 героев для сражения!
                    </p>

                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-2xl border-2 border-red-300">
                      <h4 className="font-bold text-red-800 mb-3 text-center text-sm">👹 Враги ({allEnemyTypes.length} типов):</h4>
                      <div className="grid grid-cols-6 gap-2">
                        {allEnemyTypes.map((enemy) => (
                          <div key={enemy.id} className="text-center">
                            <div className="text-3xl">{enemy.emoji}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-xs text-red-700 mt-2 font-semibold">
                        🎲 3 случайных врага в бою
                      </p>
                    </div>

                    <Button
                      onClick={() => {
                        setBattleMode('3v3');
                        setCurrentView('teamSelect');
                      }}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white game-shadow rounded-2xl transition-transform hover:scale-105"
                    >
                      <Icon name="Users" className="mr-3" size={28} />
                      Выбрать команду
                    </Button>
                  </div>
                </Card>

                <Card className="overflow-hidden border-4 border-purple-600 game-shadow hover:scale-105 transition-all rounded-3xl group cursor-pointer">
                  <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                    <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">🎯</div>
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Дуэль</h3>
                    <p className="text-xl text-white/90 font-semibold">1 на 1</p>
                  </div>

                  <div className="p-6 bg-white space-y-4">
                    <p className="text-center text-lg text-purple-700 font-semibold">
                      Один герой против одного врага!
                    </p>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-300">
                      <h4 className="font-bold text-purple-800 mb-3 text-center">⚡ Особенности:</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-center">
                          <span className="text-lg mr-2">🎲</span>
                          <span>Случайный враг из {allEnemyTypes.length} типов</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-lg mr-2">⚔️</span>
                          <span>Эпическое сражение 1 на 1</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-lg mr-2">🏆</span>
                          <span>Проверь силу героя</span>
                        </li>
                      </ul>
                    </div>

                    <Button
                      onClick={() => {
                        setBattleMode('1v1');
                        setCurrentView('heroSelect');
                      }}
                      className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white game-shadow rounded-2xl transition-transform hover:scale-105"
                    >
                      <Icon name="User" className="mr-3" size={28} />
                      Выбрать героя
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'heroSelect' && (
        <div className="max-w-5xl mx-auto py-8">
          <div className="mb-6">
            <Button
              onClick={() => setCurrentView('menu')}
              variant="outline"
              className="border-3 border-purple-600 text-purple-800 hover:bg-purple-100 rounded-2xl"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-purple-800 mb-3">🎯 Выбор героя для дуэли</h2>
            <p className="text-xl text-purple-700">
              Выбери одного героя для сражения 1 на 1
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {initialCharacters.map((char) => {
              const isSelected = selectedHero === char.id;
              return (
                <Card
                  key={char.id}
                  onClick={() => setSelectedHero(char.id)}
                  className={`overflow-hidden border-4 game-shadow cursor-pointer transition-all rounded-3xl ${
                    isSelected
                      ? 'border-purple-400 ring-4 ring-purple-300 scale-105'
                      : 'border-purple-600 hover:scale-105 opacity-70'
                  }`}
                >
                  <div className={`${char.gradient} p-4 text-center relative`}>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-purple-400 text-purple-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                        ✓
                      </div>
                    )}
                    <div className="text-6xl mb-3">{char.emoji}</div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">
                      {char.name}
                    </h3>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">❤️ HP:</span>
                        <span className="font-bold text-red-600">{char.hp}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">⚔️ Атака:</span>
                        <span className="font-bold text-orange-600">{char.attack}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">🛡️ Защита:</span>
                        <span className="font-bold text-blue-600">{char.defense}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-xl border-2 border-purple-300">
                      <p className="text-xs font-bold text-purple-800">✨ {char.ability}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={startDuel}
              disabled={!selectedHero}
              className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white game-shadow rounded-3xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Zap" className="mr-3" size={32} />
              {selectedHero ? 'В дуэль!' : 'Выбери героя'}
            </Button>
          </div>
        </div>
      )}

      {currentView === 'teamSelect' && (
        <div className="max-w-5xl mx-auto py-8">
          <div className="mb-6">
            <Button
              onClick={() => setCurrentView('menu')}
              variant="outline"
              className="border-3 border-amber-600 text-amber-800 hover:bg-amber-100 rounded-2xl"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-amber-800 mb-3">👥 Выбор команды</h2>
            <p className="text-xl text-amber-700">
              Выбери 3 героев для командного боя ({selectedTeam.length}/3)
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {initialCharacters.map((char) => {
              const isSelected = selectedTeam.includes(char.id);
              return (
                <Card
                  key={char.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTeam(selectedTeam.filter(id => id !== char.id));
                    } else if (selectedTeam.length < 3) {
                      setSelectedTeam([...selectedTeam, char.id]);
                    }
                  }}
                  className={`overflow-hidden border-4 game-shadow cursor-pointer transition-all rounded-3xl ${
                    isSelected
                      ? 'border-yellow-400 ring-4 ring-yellow-300 scale-105'
                      : 'border-amber-600 hover:scale-105 opacity-70'
                  } ${selectedTeam.length >= 3 && !isSelected ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <div className={`${char.gradient} p-4 text-center relative`}>
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                        ✓
                      </div>
                    )}
                    <div className="text-6xl mb-3">{char.emoji}</div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">
                      {char.name}
                    </h3>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">❤️ HP:</span>
                        <span className="font-bold text-red-600">{char.hp}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">⚔️ Атака:</span>
                        <span className="font-bold text-orange-600">{char.attack}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">🛡️ Защита:</span>
                        <span className="font-bold text-blue-600">{char.defense}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-xl border-2 border-purple-300">
                      <p className="text-xs font-bold text-purple-800">✨ {char.ability}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              onClick={startBattle}
              disabled={selectedTeam.length !== 3}
              className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white game-shadow rounded-3xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Swords" className="mr-3" size={32} />
              В бой! ({selectedTeam.length}/3)
            </Button>
          </div>
        </div>
      )}

      {(currentView === 'battle' || currentView === 'duel') && (
        <div className="max-w-7xl mx-auto py-6">
          <div className="mb-4">
            <Button
              onClick={() => {
                setCurrentView('menu');
                setBattleActive(false);
              }}
              variant="outline"
              className="border-3 border-amber-600 text-amber-800 hover:bg-amber-100 rounded-2xl"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">👥 Ваша команда</h3>
              <div className="grid gap-3">
                {team.map((char, index) => (
                  <Card
                    key={char.id}
                    className={`${char.gradient} p-4 border-3 game-shadow rounded-2xl cursor-pointer transition-all ${
                      selectedCharIndex === index ? 'ring-4 ring-yellow-400 scale-105' : ''
                    } ${char.hp <= 0 ? 'opacity-50 grayscale' : 'hover:scale-102'}`}
                    onClick={() => char.hp > 0 && battleActive && setSelectedCharIndex(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{char.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-bold text-white drop-shadow">{char.name}</h4>
                          <span className="text-sm text-white/90">⚔️ {char.attack} 🛡️ {char.defense}</span>
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold">HP</span>
                              <span className="font-bold">{char.hp} / {char.maxHp}</span>
                            </div>
                            <Progress value={(char.hp / char.maxHp) * 100} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-semibold">⚡ Энергия</span>
                              <span className="font-bold text-yellow-600">{energy[index]} / 3</span>
                            </div>
                            <Progress value={(energy[index] / 3) * 100} className="h-2 bg-yellow-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-700 mb-4 text-center">👹 Враги</h3>
              <div className="grid gap-3">
                {enemies.map((enemy, index) => (
                  <Card
                    key={enemy.id}
                    className={`bg-gradient-to-br from-purple-900 to-gray-800 p-4 border-3 border-red-500 game-shadow rounded-2xl cursor-pointer transition-all ${
                      selectedTarget === index ? 'ring-4 ring-red-400 scale-105' : ''
                    } ${enemy.hp <= 0 ? 'opacity-30 grayscale' : 'hover:scale-102'}`}
                    onClick={() => enemy.hp > 0 && selectedCharIndex !== null && setSelectedTarget(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{enemy.emoji}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-bold text-white drop-shadow">{enemy.name}</h4>
                          <span className="text-sm text-white/90">⚔️ {enemy.attack}</span>
                        </div>
                        <div className="bg-white/90 p-2 rounded-lg">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold">HP</span>
                            <span className="font-bold">{enemy.hp} / {enemy.maxHp}</span>
                          </div>
                          <Progress value={(enemy.hp / enemy.maxHp) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Card className="p-4 bg-white/90 backdrop-blur border-4 border-amber-600 game-shadow rounded-2xl mb-4">
            <h4 className="font-bold text-lg mb-2 text-amber-800">📜 Лог боя</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {battleLog.slice(-8).map((log, index) => (
                <p key={index} className="text-sm bg-amber-50 p-2 rounded-lg">
                  {log}
                </p>
              ))}
            </div>
          </Card>

          {battleActive && selectedCharIndex !== null && selectedTarget !== null && (
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => performAction(false)}
                className="h-14 px-8 text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white game-shadow rounded-2xl"
              >
                <Icon name="Sword" className="mr-2" />
                Атака
              </Button>

              <Button
                onClick={() => performAction(true)}
                disabled={selectedCharIndex !== null && energy[selectedCharIndex] < 3}
                className="h-14 px-8 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white game-shadow rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Sparkles" className="mr-2" />
                Способность {selectedCharIndex !== null && `(${energy[selectedCharIndex]}/3 ⚡)`}
              </Button>
            </div>
          )}

          {battleActive && (selectedCharIndex === null || selectedTarget === null) && (
            <div className="text-center">
              <p className="text-lg font-semibold text-amber-800 bg-yellow-100 p-4 rounded-2xl border-2 border-yellow-400">
                {selectedCharIndex === null
                  ? '👈 Выберите персонажа из команды'
                  : '👉 Выберите цель для атаки'}
              </p>
            </div>
          )}

          {!battleActive && (
            <div className="text-center">
              <Button
                onClick={startBattle}
                className="h-16 px-12 text-xl font-bold bg-green-500 hover:bg-green-600 text-white game-shadow rounded-2xl"
              >
                Начать новый бой
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;