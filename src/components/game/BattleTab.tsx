import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Enemy } from '@/types/game';

interface BattleTabProps {
  allEnemyTypes: Enemy[];
  bossTypes: Enemy[];
  extremeBoss: Enemy;
  onSelectMode: (mode: '3v3' | '1v1' | 'boss' | 'extreme' | 'pale-garden' | 'pumpkin-spas') => void;
}

export const BattleTab = ({ allEnemyTypes, bossTypes, extremeBoss, onSelectMode }: BattleTabProps) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-amber-800 mb-2">⚔️ Выбор режима боя</h2>
        <p className="text-lg text-amber-600">Выбери подходящий режим и вступи в битву!</p>
      </div>

      <div className="grid md:grid-cols-6 gap-4">
        <Card className="overflow-hidden border-3 border-amber-600 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">👥</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Командный</h3>
            <p className="text-sm text-white/90 font-semibold">3 на 3</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-amber-700 font-semibold">
              3 героя против 3 врагов
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-2 rounded-xl border border-red-300">
              <h4 className="font-bold text-red-800 mb-1 text-center text-xs">👹 {allEnemyTypes.length} типов</h4>
              <div className="grid grid-cols-6 gap-1">
                {allEnemyTypes.map((enemy) => (
                  <div key={enemy.id} className="text-center">
                    <div className="text-xl">{enemy.emoji}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => onSelectMode('3v3')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="Users" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-3 border-purple-600 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Дуэль</h3>
            <p className="text-sm text-white/90 font-semibold">1 на 1</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-purple-700 font-semibold">
              1 герой против 1 врага
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-xl border border-purple-300">
              <ul className="space-y-1 text-xs text-purple-700">
                <li className="flex items-center">
                  <span className="text-sm mr-1">🎲</span>
                  <span>Случайный враг</span>
                </li>
                <li className="flex items-center">
                  <span className="text-sm mr-1">⚔️</span>
                  <span>Эпичное 1v1</span>
                </li>
                <li className="flex items-center">
                  <span className="text-sm mr-1">🏆</span>
                  <span>Проверь силу</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => onSelectMode('1v1')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="User" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-3 border-red-600 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-red-600 via-orange-600 to-red-700 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">💀</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Босс</h3>
            <p className="text-sm text-white/90 font-semibold">1-3 vs Boss</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-red-700 font-semibold">
              1-3 героя против босса
            </p>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-2 rounded-xl border border-red-300">
              <h4 className="font-bold text-red-800 mb-1 text-center text-xs">💀 {bossTypes.length} босса</h4>
              <div className="grid grid-cols-3 gap-1">
                {bossTypes.map((boss) => (
                  <div key={boss.id} className="text-center bg-red-100 p-1 rounded-lg border border-red-300">
                    <div className="text-2xl mb-0.5">{boss.emoji}</div>
                    <p className="text-xs font-bold text-red-800 leading-tight">{boss.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-1.5 rounded-lg border border-yellow-400">
              <p className="text-center text-xs font-bold text-amber-800">
                💰 50 монет
              </p>
            </div>

            <Button
              onClick={() => onSelectMode('boss')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="Skull" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-3 border-cyan-600 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-600 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Экстрим</h3>
            <p className="text-sm text-white/90 font-semibold">1-3 vs Кукла</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-cyan-700 font-semibold">
              1-3 героя против легендарного босса
            </p>

            <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-2 rounded-xl border border-cyan-300">
              <div className="text-center bg-cyan-100 p-2 rounded-lg border border-cyan-400">
                <div className="text-3xl mb-1">{extremeBoss.emoji}</div>
                <p className="text-xs font-bold text-cyan-900 leading-tight">{extremeBoss.name}</p>
                <div className="flex justify-center gap-2 mt-1 text-xs">
                  <span className="text-red-700">❤️ {extremeBoss.hp}</span>
                  <span className="text-orange-700">⚔️ {extremeBoss.attack}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-1.5 rounded-lg border border-yellow-400">
              <p className="text-center text-xs font-bold text-amber-800">
                💰 100 монет
              </p>
            </div>

            <Button
              onClick={() => onSelectMode('extreme')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="Zap" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-3 border-gray-400 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-slate-400 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">🌸</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Бледный сад</h3>
            <p className="text-sm text-white/90 font-semibold">2 на 2</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-gray-700 font-semibold">
              2 героя против 2 случайных врагов из сада
            </p>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-2 rounded-xl border border-gray-300">
              <h4 className="font-bold text-gray-800 mb-1 text-center text-xs">👹 4 уникальных врага</h4>
              <div className="grid grid-cols-4 gap-1">
                <div className="text-center">
                  <div className="text-xl">🦟</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">🧟</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">👤</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">🗿</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-1.5 rounded-lg border border-yellow-400">
              <p className="text-center text-xs font-bold text-amber-800">
                💰 30 монет
              </p>
            </div>

            <Button
              onClick={() => onSelectMode('pale-garden')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="Flower2" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>

        <Card className="overflow-hidden border-3 border-orange-600 game-shadow hover:scale-105 transition-all rounded-2xl group cursor-pointer">
          <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
            <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">🎃</div>
            <h3 className="text-base font-bold text-white mb-1 drop-shadow-lg">Тыквенный спас</h3>
            <p className="text-sm text-white/90 font-semibold">1-3 на 3</p>
          </div>

          <div className="p-3 bg-white space-y-2">
            <p className="text-center text-xs text-orange-700 font-semibold">
              1-3 героя против тыквенных врагов
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-2 rounded-xl border border-orange-300">
              <h4 className="font-bold text-orange-800 mb-1 text-center text-xs">🎃 4 уникальных врага</h4>
              <div className="grid grid-cols-4 gap-1">
                <div className="text-center">
                  <div className="text-xl">🎃</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">💀</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">👻</div>
                </div>
                <div className="text-center">
                  <div className="text-xl">👻👻👻</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-1.5 rounded-lg border border-yellow-400">
              <p className="text-center text-xs font-bold text-amber-800">
                💰 50 монет
              </p>
            </div>

            <Button
              onClick={() => onSelectMode('pumpkin-spas')}
              className="w-full h-10 text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white game-shadow rounded-xl transition-transform hover:scale-105"
            >
              <Icon name="Ghost" className="mr-1" size={16} />
              Выбрать
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};