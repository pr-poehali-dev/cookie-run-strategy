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
  const [currentView, setCurrentView] = useState<'menu' | 'battle'>('menu');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleActive, setBattleActive] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);

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
      emoji: '🍪'
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
      emoji: '🌑'
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
      emoji: '🍓'
    }
  ];

  const initialEnemies: Enemy[] = [
    {
      id: 'cake-hound-1',
      name: 'Cake Hound',
      hp: 800,
      maxHp: 800,
      attack: 90,
      emoji: '🐕'
    },
    {
      id: 'cake-hound-2',
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
    }
  ];

  const [team, setTeam] = useState<Character[]>(initialCharacters);
  const [enemies, setEnemies] = useState<Enemy[]>(initialEnemies);

  const startBattle = () => {
    setTeam(JSON.parse(JSON.stringify(initialCharacters)));
    setEnemies(JSON.parse(JSON.stringify(initialEnemies)));
    setBattleLog(['⚔️ Командная битва началась! Выберите персонажа для атаки']);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('battle');
  };

  const performAction = (useAbility: boolean) => {
    if (selectedCharIndex === null || selectedTarget === null || !battleActive) return;

    const newTeam = [...team];
    const newEnemies = [...enemies];
    const character = newTeam[selectedCharIndex];
    const target = newEnemies[selectedTarget];
    const newLog = [...battleLog];

    if (character.hp <= 0) {
      newLog.push(`${character.name} не может атаковать!`);
      setBattleLog(newLog);
      return;
    }

    if (useAbility) {
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
      }
    } else {
      const damage = Math.max(1, Math.floor(character.attack * 0.8));
      target.hp = Math.max(0, target.hp - damage);
      newLog.push(`⚔️ ${character.name} атакует ${target.name}! Урон: ${damage}`);
    }

    setTeam(newTeam);
    setEnemies(newEnemies);
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
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 mb-4 drop-shadow-lg">
              Cookie Run Kingdom
            </h1>
            <p className="text-2xl text-amber-800 font-semibold">Командная стратегия 🍪</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {initialCharacters.map((char) => (
              <Card
                key={char.id}
                className="overflow-hidden border-4 border-amber-600 game-shadow rounded-3xl"
              >
                <div className={`${char.gradient} p-6 text-center`}>
                  <div className="text-6xl mb-3">{char.emoji}</div>
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
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
                    <p className="font-bold text-purple-800 text-xs mb-1">✨ {char.ability}</p>
                    <p className="text-xs text-purple-700">{char.abilityDesc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={startBattle}
              className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white game-shadow rounded-3xl transition-transform hover:scale-105"
            >
              <Icon name="Swords" className="mr-3" size={32} />
              Начать командный бой!
            </Button>
          </div>
        </div>
      )}

      {currentView === 'battle' && (
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
                        <div className="bg-white/90 p-2 rounded-lg">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold">HP</span>
                            <span className="font-bold">{char.hp} / {char.maxHp}</span>
                          </div>
                          <Progress value={(char.hp / char.maxHp) * 100} className="h-2" />
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
                className="h-14 px-8 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white game-shadow rounded-2xl"
              >
                <Icon name="Sparkles" className="mr-2" />
                Способность
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
