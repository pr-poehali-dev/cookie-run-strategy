import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/game';

interface CharactersTabProps {
  characters: Character[];
  ownedCharacters: string[];
  coins: number;
  onBuyCharacter: (charId: string) => void;
}

export const CharactersTab = ({ characters, ownedCharacters, coins, onBuyCharacter }: CharactersTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-amber-800 mb-2">Коллекция героев</h2>
        <p className="text-lg text-amber-600">Открыто: {ownedCharacters.length} / {characters.length}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {characters.map((char) => {
          const isOwned = ownedCharacters.includes(char.id);
          const canBuy = !isOwned && coins >= 100;
          
          return (
            <Card
              key={char.id}
              className={`overflow-hidden border-4 game-shadow transition-all rounded-3xl group ${
                isOwned 
                  ? 'border-amber-600 hover:scale-105' 
                  : 'border-gray-400 opacity-75'
              }`}
            >
              <div className={`${char.gradient} p-8 text-center relative overflow-hidden ${!isOwned && 'grayscale'}`}>
                {!isOwned && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🔒</div>
                      <p className="text-xl font-bold text-white mb-2">Заблокирован</p>
                    </div>
                  </div>
                )}
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
                    <span className="text-xs text-purple-600 font-semibold">⚡ Требует {char.maxEnergy} энергии</span>
                  </div>
                </div>

                {!isOwned && (
                  <Button
                    onClick={() => onBuyCharacter(char.id)}
                    disabled={!canBuy}
                    className={`w-full h-14 text-lg font-bold rounded-2xl transition-all ${
                      canBuy
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white game-shadow'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={20} />
                    {canBuy ? 'Купить за 100 💰' : `Нужно 100 💰 (есть ${coins})`}
                  </Button>
                )}

                {isOwned && char.id === 'gingerbrave' && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl border-2 border-green-400 text-center">
                    <p className="text-sm font-bold text-green-800">🎁 Стартовый персонаж</p>
                  </div>
                )}

                {isOwned && char.id !== 'gingerbrave' && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl border-2 border-green-400 text-center">
                    <p className="text-sm font-bold text-green-800">✓ В вашей коллекции</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
