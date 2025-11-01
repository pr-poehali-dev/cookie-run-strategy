import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';

interface BossTeamSelectionProps {
  characters: Character[];
  ownedCharacters: string[];
  selectedTeam: string[];
  teamSize: number;
  mode?: 'boss' | 'extreme' | 'pumpkin-spas';
  onToggleCharacter: (charId: string) => void;
  onTeamSizeChange: (size: number) => void;
  onStartBattle: () => void;
  onBack: () => void;
}

export const BossTeamSelection = ({
  characters,
  ownedCharacters,
  selectedTeam,
  teamSize,
  mode = 'boss',
  onToggleCharacter,
  onTeamSizeChange,
  onStartBattle,
  onBack
}: BossTeamSelectionProps) => {
  const modeConfig = {
    boss: { title: '💀 Выбор команды для битвы с боссом', color: 'red', icon: 'Skull' },
    extreme: { title: '⚡ Выбор команды для экстрим боя', color: 'cyan', icon: 'Zap' },
    'pumpkin-spas': { title: '🎃 Выбор команды для Тыквенного спаса', color: 'orange', icon: 'Ghost' }
  };
  const config = modeConfig[mode];
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-3 border-red-600 text-red-800 hover:bg-red-100 rounded-2xl"
        >
          <Icon name="ArrowLeft" className="mr-2" />
          Назад
        </Button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-red-800 mb-3">{config.title}</h2>
        <p className="text-xl text-red-700">
          Выбери от 1 до 3 героев для сражения ({selectedTeam.length}/{teamSize})
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-amber-800 text-center mb-4">Размер команды:</h3>
        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((size) => (
            <Button
              key={size}
              onClick={() => {
                onTeamSizeChange(size);
              }}
              className={`h-16 w-24 text-2xl font-bold rounded-2xl transition-all ${
                teamSize === size
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white game-shadow scale-105'
                  : 'bg-white text-red-500 border-3 border-red-500 hover:scale-105'
              }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {characters.filter(char => ownedCharacters.includes(char.id)).map((char) => {
          const isSelected = selectedTeam.includes(char.id);
          const isDisabled = !isSelected && selectedTeam.length >= teamSize;
          
          return (
            <Card
              key={char.id}
              onClick={() => !isDisabled && onToggleCharacter(char.id)}
              className={`overflow-hidden border-4 game-shadow cursor-pointer transition-all rounded-3xl ${
                isSelected
                  ? 'border-red-400 ring-4 ring-red-300 scale-105'
                  : isDisabled
                  ? 'border-gray-400 opacity-40 cursor-not-allowed'
                  : 'border-red-600 hover:scale-105 opacity-70'
              }`}
            >
              <div className={`${char.gradient} p-4 text-center relative`}>
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-red-400 text-red-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
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
          onClick={onStartBattle}
          disabled={selectedTeam.length === 0 || selectedTeam.length < 1 || selectedTeam.length > teamSize}
          className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white game-shadow rounded-3xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name={config.icon as any} className="mr-3" size={32} />
          В бой! ({selectedTeam.length}/{teamSize})
        </Button>
        {selectedTeam.length === 0 && (
          <p className="mt-3 text-red-600 font-semibold">Выбери минимум 1 героя для боя!</p>
        )}
      </div>
    </div>
  );
};