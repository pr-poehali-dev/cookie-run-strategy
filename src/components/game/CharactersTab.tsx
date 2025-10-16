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

      <div className="grid md:grid-cols-5 gap-4">
        {characters.map((char) => {
          const isOwned = ownedCharacters.includes(char.id);
          const price = char.id === 'metal-knight' ? 200 : 100;
          const canBuy = !isOwned && coins >= price;
          
          return (
            <Card
              key={char.id}
              className={`overflow-hidden border-4 game-shadow transition-all rounded-3xl group ${
                isOwned 
                  ? 'border-amber-600 hover:scale-105' 
                  : 'border-gray-400 opacity-75'
              }`}
            >
              <div className={`${char.gradient} p-4 text-center relative overflow-hidden ${!isOwned && 'grayscale'}`}>
                {!isOwned && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="text-3xl mb-1">🔒</div>
                      <p className="text-xs font-bold text-white">Заблокирован</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                <div className="text-5xl mb-2 transform group-hover:scale-110 transition-transform">{char.emoji}</div>
                <h3 className="text-sm font-bold text-white mb-1 drop-shadow-lg">
                  {char.name}
                </h3>
                <div className="flex justify-center gap-1 text-white/90 text-xs">
                  <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    ⚔️ {char.attack}
                  </span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    🛡️ {char.defense}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white space-y-2">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-2 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-red-700 text-xs">❤️ HP</span>
                    <span className="text-base font-bold text-red-600">{char.hp}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-2 rounded-lg border-2 border-purple-400">
                  <div className="flex items-start gap-1 mb-1">
                    <span className="text-sm">✨</span>
                    <div className="flex-1">
                      <p className="font-bold text-purple-900 text-xs mb-0.5">{char.ability}</p>
                      <p className="text-xs text-purple-700 leading-snug">{char.abilityDesc}</p>
                    </div>
                  </div>
                  <div className="mt-1 pt-1 border-t border-purple-300">
                    <span className="text-xs text-purple-600 font-semibold">⚡ {char.maxEnergy} энергии</span>
                  </div>
                </div>

                {!isOwned && (
                  <Button
                    onClick={() => onBuyCharacter(char.id)}
                    disabled={!canBuy}
                    className={`w-full h-10 text-xs font-bold rounded-xl transition-all ${
                      canBuy
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white game-shadow'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Icon name="ShoppingCart" className="mr-1" size={14} />
                    {price} 💰
                  </Button>
                )}

                {isOwned && char.id === 'gingerbrave' && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-xl border border-green-400 text-center">
                    <p className="text-xs font-bold text-green-800">🎁 Стартовый</p>
                  </div>
                )}

                {isOwned && char.id !== 'gingerbrave' && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-xl border border-green-400 text-center">
                    <p className="text-xs font-bold text-green-800">✓ Открыт</p>
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