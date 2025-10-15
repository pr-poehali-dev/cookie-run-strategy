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
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'characters' | 'battle'>('menu');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleActive, setBattleActive] = useState(false);

  const characters: Character[] = [
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
      name: 'Shadow Milk Cookie',
      hp: 850,
      maxHp: 850,
      attack: 180,
      defense: 65,
      ability: 'Dark Deceit',
      abilityDesc: 'Наносит 250% урона и снижает защиту врага на 30%',
      gradient: 'shadow-gradient',
      emoji: '🌑'
    },
    {
      id: 'strawberry',
      name: 'Strawberry Cookie',
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

  const [enemy, setEnemy] = useState<Enemy>({
    id: 'cake-hound',
    name: 'Cake Hound',
    hp: 1200,
    maxHp: 1200,
    attack: 100
  });

  const [playerChar, setPlayerChar] = useState<Character | null>(null);

  const startBattle = (character: Character) => {
    setPlayerChar({ ...character });
    setEnemy({
      id: 'cake-hound',
      name: 'Cake Hound',
      hp: 1200,
      maxHp: 1200,
      attack: 100
    });
    setBattleLog(['Битва началась! 🎮']);
    setIsPlayerTurn(true);
    setBattleActive(true);
    setCurrentView('battle');
  };

  const performAttack = (useAbility: boolean = false) => {
    if (!playerChar || !isPlayerTurn || !battleActive) return;

    const newPlayerChar = { ...playerChar };
    const newEnemy = { ...enemy };
    const newLog = [...battleLog];

    if (useAbility) {
      if (playerChar.id === 'gingerbrave') {
        const damage = Math.floor(playerChar.attack * 2);
        newEnemy.hp = Math.max(0, newEnemy.hp - damage);
        const heal = Math.floor(playerChar.maxHp * 0.15);
        newPlayerChar.hp = Math.min(playerChar.maxHp, playerChar.hp + heal);
        newLog.push(`${playerChar.name} использует ${playerChar.ability}! 💥 Урон: ${damage}, Лечение: ${heal}`);
      } else if (playerChar.id === 'shadow-milk') {
        const damage = Math.floor(playerChar.attack * 2.5);
        newEnemy.hp = Math.max(0, newEnemy.hp - damage);
        newLog.push(`${playerChar.name} использует ${playerChar.ability}! 🌟 Критический урон: ${damage}!`);
      } else if (playerChar.id === 'strawberry') {
        const heal = Math.floor(playerChar.maxHp * 0.4);
        newPlayerChar.hp = Math.min(playerChar.maxHp, playerChar.hp + heal);
        newLog.push(`${playerChar.name} использует ${playerChar.ability}! 💚 Восстановлено HP: ${heal}`);
      }
    } else {
      const damage = Math.max(1, playerChar.attack - Math.floor(enemy.attack * 0.2));
      newEnemy.hp = Math.max(0, newEnemy.hp - damage);
      newLog.push(`${playerChar.name} атакует! ⚔️ Урон: ${damage}`);
    }

    if (newEnemy.hp <= 0) {
      newLog.push('🎉 Победа! Cake Hound повержен!');
      setBattleActive(false);
      setBattleLog(newLog);
      setPlayerChar(newPlayerChar);
      setEnemy(newEnemy);
      return;
    }

    setIsPlayerTurn(false);
    setBattleLog(newLog);
    setPlayerChar(newPlayerChar);
    setEnemy(newEnemy);

    setTimeout(() => {
      enemyTurn(newPlayerChar, newEnemy, newLog);
    }, 1500);
  };

  const enemyTurn = (currentPlayer: Character, currentEnemy: Enemy, currentLog: string[]) => {
    const damage = Math.max(1, currentEnemy.attack - Math.floor(currentPlayer.defense * 0.3));
    const newPlayerHp = Math.max(0, currentPlayer.hp - damage);
    const newLog = [...currentLog, `${currentEnemy.name} атакует! 🐕 Урон: ${damage}`];

    setPlayerChar({ ...currentPlayer, hp: newPlayerHp });
    setBattleLog(newLog);

    if (newPlayerHp <= 0) {
      newLog.push('💀 Поражение... Попробуйте снова!');
      setBattleActive(false);
      setBattleLog(newLog);
    } else {
      setIsPlayerTurn(true);
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
            <p className="text-2xl text-amber-800 font-semibold">Пошаговая стратегия 🍪</p>
          </div>

          <div className="grid gap-6 max-w-md mx-auto">
            <Button
              onClick={() => setCurrentView('characters')}
              className="h-20 text-2xl font-bold bg-pink-500 hover:bg-pink-600 text-white game-shadow rounded-3xl transition-transform hover:scale-105"
            >
              <Icon name="Users" className="mr-3" size={32} />
              Выбрать персонажа
            </Button>

            <Button
              variant="outline"
              className="h-20 text-2xl font-bold border-4 border-amber-600 text-amber-800 hover:bg-amber-100 game-shadow rounded-3xl transition-transform hover:scale-105"
            >
              <Icon name="Trophy" className="mr-3" size={32} />
              Рейтинг
            </Button>

            <Button
              variant="outline"
              className="h-20 text-2xl font-bold border-4 border-purple-600 text-purple-800 hover:bg-purple-100 game-shadow rounded-3xl transition-transform hover:scale-105"
            >
              <Icon name="Settings" className="mr-3" size={32} />
              Настройки
            </Button>
          </div>
        </div>
      )}

      {currentView === 'characters' && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={() => setCurrentView('menu')}
              variant="outline"
              className="border-3 border-amber-600 text-amber-800 hover:bg-amber-100 rounded-2xl"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
            <h2 className="text-4xl font-bold text-amber-800">Выбери героя 🌟</h2>
            <div className="w-24"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {characters.map((char) => (
              <Card
                key={char.id}
                className="overflow-hidden border-4 border-amber-600 game-shadow hover:scale-105 transition-transform cursor-pointer rounded-3xl"
                onClick={() => setSelectedCharacter(char)}
              >
                <div className={`${char.gradient} p-6 text-center`}>
                  <div className="text-8xl mb-4">{char.emoji}</div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {char.name}
                  </h3>
                </div>

                <div className="p-6 bg-white">
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">❤️ HP:</span>
                      <span className="font-bold text-red-600">{char.hp}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">⚔️ Атака:</span>
                      <span className="font-bold text-orange-600">{char.attack}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">🛡️ Защита:</span>
                      <span className="font-bold text-blue-600">{char.defense}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-2xl mb-4 border-2 border-purple-300">
                    <p className="font-bold text-purple-800 mb-1 text-sm">✨ {char.ability}</p>
                    <p className="text-xs text-purple-700">{char.abilityDesc}</p>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      startBattle(char);
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-2xl h-12"
                  >
                    В бой! 🎮
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentView === 'battle' && playerChar && (
        <div className="max-w-5xl mx-auto py-8">
          <div className="mb-6">
            <Button
              onClick={() => {
                setCurrentView('characters');
                setBattleActive(false);
              }}
              variant="outline"
              className="border-3 border-amber-600 text-amber-800 hover:bg-amber-100 rounded-2xl"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Выйти из боя
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <Card className={`${playerChar.gradient} p-6 border-4 border-amber-600 game-shadow rounded-3xl`}>
              <div className="text-center mb-4">
                <div className="text-7xl mb-3">{playerChar.emoji}</div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{playerChar.name}</h3>
              </div>
              <div className="bg-white/90 backdrop-blur p-4 rounded-2xl">
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">❤️ HP</span>
                    <span className="font-bold">{playerChar.hp} / {playerChar.maxHp}</span>
                  </div>
                  <Progress value={(playerChar.hp / playerChar.maxHp) * 100} className="h-3" />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>⚔️ {playerChar.attack}</span>
                  <span>🛡️ {playerChar.defense}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900 to-gray-800 p-6 border-4 border-red-600 game-shadow rounded-3xl">
              <div className="text-center mb-4">
                <div className="text-7xl mb-3">🐕</div>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{enemy.name}</h3>
              </div>
              <div className="bg-white/90 backdrop-blur p-4 rounded-2xl">
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">❤️ HP</span>
                    <span className="font-bold">{enemy.hp} / {enemy.maxHp}</span>
                  </div>
                  <Progress value={(enemy.hp / enemy.maxHp) * 100} className="h-3" />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>⚔️ {enemy.attack}</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white/90 backdrop-blur border-4 border-amber-600 game-shadow rounded-3xl mb-6">
            <h4 className="font-bold text-lg mb-3 text-amber-800">📜 Лог боя</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm bg-amber-50 p-2 rounded-lg animate-fade-in">
                  {log}
                </p>
              ))}
            </div>
          </Card>

          {battleActive && (
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => performAttack(false)}
                disabled={!isPlayerTurn}
                className="h-16 px-8 text-xl font-bold bg-orange-500 hover:bg-orange-600 text-white game-shadow rounded-2xl disabled:opacity-50"
              >
                <Icon name="Sword" className="mr-2" />
                Атака
              </Button>

              <Button
                onClick={() => performAttack(true)}
                disabled={!isPlayerTurn}
                className="h-16 px-8 text-xl font-bold bg-purple-600 hover:bg-purple-700 text-white game-shadow rounded-2xl disabled:opacity-50"
              >
                <Icon name="Sparkles" className="mr-2" />
                Способность
              </Button>
            </div>
          )}

          {!battleActive && (
            <div className="text-center">
              <Button
                onClick={() => {
                  if (playerChar.hp <= 0) {
                    startBattle(playerChar);
                  } else {
                    setCurrentView('characters');
                  }
                }}
                className="h-16 px-12 text-xl font-bold bg-green-500 hover:bg-green-600 text-white game-shadow rounded-2xl"
              >
                {playerChar.hp <= 0 ? 'Попробовать снова' : 'Следующий бой'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
