import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Character, Enemy } from '@/types/game';

interface BattleSceneProps {
  team: Character[];
  enemies: Enemy[];
  energy: number[];
  battleLog: string[];
  battleActive: boolean;
  selectedCharIndex: number | null;
  selectedTarget: number | null;
  onSelectChar: (index: number) => void;
  onSelectTarget: (index: number) => void;
  onPerformAction: (useAbility: boolean) => void;
  onStartBattle: () => void;
  onExit: () => void;
}

export const BattleScene = ({
  team,
  enemies,
  energy,
  battleLog,
  battleActive,
  selectedCharIndex,
  selectedTarget,
  onSelectChar,
  onSelectTarget,
  onPerformAction,
  onStartBattle,
  onExit
}: BattleSceneProps) => {
  return (
    <div className="max-w-7xl mx-auto py-6">
      <div className="mb-4">
        <Button
          onClick={onExit}
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
                onClick={() => char.hp > 0 && battleActive && onSelectChar(index)}
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
                          <span className="font-bold text-yellow-600">{energy[index]} / {char.maxEnergy}</span>
                        </div>
                        <Progress value={(energy[index] / char.maxEnergy) * 100} className="h-2 bg-yellow-200" />
                      </div>
                      {char.regenTurns && char.regenTurns > 0 && (
                        <div className="bg-green-100 p-1 rounded border border-green-400">
                          <p className="text-xs font-bold text-green-800 text-center">
                            🌿 Регенерация: {char.regenTurns} ходов
                          </p>
                        </div>
                      )}
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
                onClick={() => enemy.hp > 0 && selectedCharIndex !== null && onSelectTarget(index)}
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
            onClick={() => onPerformAction(false)}
            className="h-14 px-8 text-lg font-bold bg-orange-500 hover:bg-orange-600 text-white game-shadow rounded-2xl"
          >
            <Icon name="Sword" className="mr-2" />
            Атака
          </Button>

          <Button
            onClick={() => onPerformAction(true)}
            disabled={selectedCharIndex !== null && energy[selectedCharIndex] < team[selectedCharIndex]?.maxEnergy}
            className="h-14 px-8 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white game-shadow rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Sparkles" className="mr-2" />
            Способность {selectedCharIndex !== null && `(${energy[selectedCharIndex]}/${team[selectedCharIndex]?.maxEnergy || 3} ⚡)`}
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
            onClick={onStartBattle}
            className="h-16 px-12 text-xl font-bold bg-green-500 hover:bg-green-600 text-white game-shadow rounded-2xl"
          >
            Начать новый бой
          </Button>
        </div>
      )}
    </div>
  );
};