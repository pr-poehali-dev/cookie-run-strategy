import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character, Enemy } from '@/types/game';

interface ChessTabProps {
  characters: Character[];
  ownedCharacters: string[];
  chessCoins: number;
  coins: number;
  coinsPurchases: number;
  onBuyCharacter: (charId: string) => void;
  onBuyCoins: () => void;
  onStartChessBattle: () => void;
  onResetProgress: () => void;
}

const chessEnemies: Enemy[] = [
  { id: 'queen', name: 'Ферзь', hp: 600, maxHp: 600, attack: 110, emoji: '♕' },
  { id: 'knight', name: 'Конь', hp: 600, maxHp: 600, attack: 150, emoji: '♘' },
  { id: 'king', name: 'Король', hp: 900, maxHp: 900, attack: 100, emoji: '♔' },
  { id: 'pawn', name: 'Пешка', hp: 500, maxHp: 500, attack: 85, emoji: '♙' },
  { id: 'rook', name: 'Ладья', hp: 700, maxHp: 700, attack: 100, emoji: '♖' }
];

export const ChessTab = ({
  characters,
  ownedCharacters,
  chessCoins,
  coins,
  coinsPurchases,
  onBuyCharacter,
  onBuyCoins,
  onStartChessBattle,
  onResetProgress
}: ChessTabProps) => {
  const chocoChess = characters.find(c => c.id === 'choco-chess');
  const concierge = characters.find(c => c.id === 'concierge');
  const maxCoinsPurchases = 3;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-br from-amber-900 via-yellow-900 to-stone-800 p-6 border-3 border-yellow-600 game-shadow rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">♟️ Шахматная доска</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border-2 border-white/20">
              <h3 className="text-2xl font-bold text-yellow-300 mb-3 flex items-center gap-2">
                <Icon name="Coins" size={28} />
                Ваши ресурсы
              </h3>
              <div className="space-y-2">
                <div className="bg-yellow-100 p-3 rounded-lg border-2 border-yellow-400">
                  <p className="text-center text-lg font-bold text-yellow-800">
                    💰 Монеты: {coins}
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg border-2 border-amber-600">
                  <p className="text-center text-lg font-bold text-amber-900">
                    ♟️ Шахматы: {chessCoins}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border-2 border-white/20">
              <h3 className="text-2xl font-bold text-red-300 mb-3 flex items-center gap-2">
                <Icon name="Skull" size={28} />
                Враги
              </h3>
              <p className="text-white/90 mb-3 text-sm">Победи 3 случайных врагов в бою!</p>
              <div className="grid grid-cols-5 gap-2">
                {chessEnemies.map(enemy => (
                  <div key={enemy.id} className="bg-purple-900/50 p-2 rounded-lg border border-purple-500">
                    <div className="text-3xl text-center mb-1">{enemy.emoji}</div>
                    <p className="text-xs text-center text-white font-bold leading-tight">{enemy.name}</p>
                    <p className="text-xs text-center text-red-300">❤️ {enemy.hp}</p>
                    <p className="text-xs text-center text-orange-300">⚔️ {enemy.attack}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={onStartChessBattle}
              className="w-full h-16 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xl font-bold rounded-2xl border-3 border-yellow-300 game-shadow hover:scale-105 transition-all"
            >
              <Icon name="Play" className="mr-2" size={28} />
              Начать шахматный бой
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border-2 border-white/20">
              <h3 className="text-2xl font-bold text-green-300 mb-3 flex items-center gap-2">
                <Icon name="ShoppingCart" size={28} />
                Магазин
              </h3>

              <div className="space-y-3">
                <Card className="bg-gradient-to-br from-yellow-100 to-amber-200 p-4 border-3 border-yellow-500 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-yellow-900">💰 50 монет</h4>
                      <p className="text-xs text-yellow-700">Купить за 70 шахмат</p>
                      <p className="text-xs text-orange-700 font-bold mt-1">
                        Куплено: {coinsPurchases}/{maxCoinsPurchases}
                      </p>
                    </div>
                    <Button
                      onClick={onBuyCoins}
                      disabled={chessCoins < 70 || coinsPurchases >= maxCoinsPurchases}
                      className="bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50"
                    >
                      Купить
                    </Button>
                  </div>
                </Card>

                {chocoChess && (
                  <Card className={`${chocoChess.gradient} p-4 border-3 border-amber-700 rounded-xl`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-5xl">{chocoChess.emoji}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white drop-shadow">{chocoChess.name}</h4>
                        <div className="flex gap-2 text-sm text-white/90">
                          <span>❤️ {chocoChess.maxHp}</span>
                          <span>⚔️ {chocoChess.attack}</span>
                          <span>🛡️ {chocoChess.defense}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/90 mb-2">{chocoChess.abilityDesc}</p>
                    <Button
                      onClick={() => onBuyCharacter(chocoChess.id)}
                      disabled={ownedCharacters.includes(chocoChess.id) || coins < 200}
                      className="w-full bg-yellow-600 text-white font-bold rounded-xl hover:bg-yellow-700 disabled:opacity-50"
                    >
                      {ownedCharacters.includes(chocoChess.id) ? '✅ Куплено' : '💰 200 монет'}
                    </Button>
                  </Card>
                )}

                {concierge && (
                  <Card className={`${concierge.gradient} p-4 border-3 border-cyan-600 rounded-xl`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-5xl">{concierge.emoji}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white drop-shadow">{concierge.name}</h4>
                        <div className="flex gap-2 text-sm text-white/90">
                          <span>❤️ {concierge.maxHp}</span>
                          <span>⚔️ {concierge.attack}</span>
                          <span>🛡️ {concierge.defense}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/90 mb-2">{concierge.abilityDesc}</p>
                    <Button
                      onClick={() => onBuyCharacter(concierge.id)}
                      disabled={ownedCharacters.includes(concierge.id) || chessCoins < 100}
                      className="w-full bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 disabled:opacity-50"
                    >
                      {ownedCharacters.includes(concierge.id) ? '✅ Куплено' : '♟️ 100 шахмат'}
                    </Button>
                  </Card>
                )}
              </div>
            </div>

            <Button
              onClick={onResetProgress}
              variant="destructive"
              className="w-full h-12 text-lg font-bold rounded-2xl border-3 border-red-700 game-shadow"
            >
              <Icon name="RotateCcw" className="mr-2" size={20} />
              Сбросить прогресс
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
