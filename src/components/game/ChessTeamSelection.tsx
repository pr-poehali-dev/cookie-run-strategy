import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';

interface ChessTeamSelectionProps {
  characters: Character[];
  ownedCharacters: string[];
  selectedTeam: string[];
  onToggleCharacter: (charId: string) => void;
  onStartBattle: () => void;
  onBack: () => void;
}

export const ChessTeamSelection = ({
  characters,
  ownedCharacters,
  selectedTeam,
  onToggleCharacter,
  onStartBattle,
  onBack
}: ChessTeamSelectionProps) => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-3 border-amber-600 text-amber-800 hover:bg-amber-100 rounded-2xl"
        >
          <Icon name="ArrowLeft" className="mr-2" />
          Назад
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-amber-900 via-yellow-900 to-stone-800 p-8 border-3 border-yellow-600 game-shadow rounded-3xl mb-8">
        <h2 className="text-5xl font-bold text-center text-white mb-4">♟️ Шахматный бой</h2>
        <p className="text-center text-xl text-yellow-200">
          Выбери от 1 до 3 героев для боя ({selectedTeam.length}/3)
        </p>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {characters.filter(char => ownedCharacters.includes(char.id)).map((char) => {
          const isSelected = selectedTeam.includes(char.id);
          return (
            <Card
              key={char.id}
              onClick={() => onToggleCharacter(char.id)}
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
                    <span className="font-bold text-red-600">{char.maxHp}</span>
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
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg border-2 border-purple-300">
                  <p className="text-xs text-center font-bold text-purple-900 mb-1">
                    {char.ability}
                  </p>
                  <p className="text-xs text-center text-purple-700 leading-tight">
                    {char.abilityDesc}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          onClick={onStartBattle}
          disabled={selectedTeam.length < 1 || selectedTeam.length > 3}
          className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white game-shadow rounded-3xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="Swords" className="mr-3" size={32} />
          В бой! ({selectedTeam.length}/3)
        </Button>
      </div>
    </div>
  );
};
