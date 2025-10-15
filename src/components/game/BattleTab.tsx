import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Enemy } from '@/types/game';

interface BattleTabProps {
  allEnemyTypes: Enemy[];
  bossTypes: Enemy[];
  onSelectMode: (mode: '3v3' | '1v1' | 'boss') => void;
}

export const BattleTab = ({ allEnemyTypes, bossTypes, onSelectMode }: BattleTabProps) => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-amber-800 mb-3">⚔️ Выбор режима боя</h2>
        <p className="text-xl text-amber-600">Выбери подходящий режим и вступи в битву!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
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
              onClick={() => onSelectMode('3v3')}
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
              onClick={() => onSelectMode('1v1')}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white game-shadow rounded-2xl transition-transform hover:scale-105"
            >
              <Icon name="User" className="mr-3" size={28} />
              Выбрать героя
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-4 border-red-600 game-shadow hover:scale-105 transition-all rounded-3xl group cursor-pointer">
          <div className="bg-gradient-to-br from-red-600 via-orange-600 to-red-700 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform">💀</div>
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Бой с боссом</h3>
            <p className="text-xl text-white/90 font-semibold">1-3 vs Босс</p>
          </div>

          <div className="p-6 bg-white space-y-4">
            <p className="text-center text-lg text-red-700 font-semibold">
              Выбери от 1 до 3 героев для сражения с боссом!
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-2xl border-2 border-red-300">
              <h4 className="font-bold text-red-800 mb-3 text-center text-sm">💀 Боссы ({bossTypes.length} типов):</h4>
              <div className="grid grid-cols-3 gap-3">
                {bossTypes.map((boss) => (
                  <div key={boss.id} className="text-center bg-red-100 p-3 rounded-xl border-2 border-red-300">
                    <div className="text-4xl mb-1">{boss.emoji}</div>
                    <p className="text-xs font-bold text-red-800">{boss.name}</p>
                    <p className="text-xs text-red-600">HP: {boss.hp}</p>
                    <p className="text-xs text-red-600">⚔️ {boss.attack}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-red-700 mt-2 font-semibold">
                🎲 1 случайный босс в бою
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-2xl border-2 border-yellow-400">
              <p className="text-center text-sm font-bold text-amber-800">
                💰 Награда за победу: 50 монет
              </p>
            </div>

            <Button
              onClick={() => onSelectMode('boss')}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white game-shadow rounded-2xl transition-transform hover:scale-105"
            >
              <Icon name="Skull" className="mr-3" size={28} />
              Выбрать команду
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};