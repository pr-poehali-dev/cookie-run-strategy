import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';

interface HeroSelectionProps {
  characters: Character[];
  ownedCharacters: string[];
  selectedHero: string | null;
  onSelectHero: (heroId: string) => void;
  onStartDuel: () => void;
  onBack: () => void;
}

export const HeroSelection = ({
  characters,
  ownedCharacters,
  selectedHero,
  onSelectHero,
  onStartDuel,
  onBack
}: HeroSelectionProps) => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-6">
        <Button
          onClick={onBack}
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
        {characters.filter(char => ownedCharacters.includes(char.id)).map((char) => {
          const isSelected = selectedHero === char.id;
          return (
            <Card
              key={char.id}
              onClick={() => onSelectHero(char.id)}
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
          onClick={onStartDuel}
          disabled={!selectedHero}
          className="h-20 px-12 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white game-shadow rounded-3xl transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="Zap" className="mr-3" size={32} />
          {selectedHero ? 'В дуэль!' : 'Выбери героя'}
        </Button>
      </div>
    </div>
  );
};
