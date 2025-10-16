import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character, Enemy, ViewType, BattleMode, TabType } from '@/types/game';
import { initialCharacters, allEnemyTypes, bossTypes, extremeBoss, getRandomEnemies, getRandomEnemy, getRandomBoss } from '@/data/characters';
import { CharactersTab } from '@/components/game/CharactersTab';
import { BattleTab } from '@/components/game/BattleTab';
import { TeamSelection } from '@/components/game/TeamSelection';
import { HeroSelection } from '@/components/game/HeroSelection';
import { BattleScene } from '@/components/game/BattleScene';
import { BossTeamSelection } from '@/components/game/BossTeamSelection';
import { performCharacterAbility, performEnemyTurn } from '@/utils/battleLogic';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('menu');
  const [activeTab, setActiveTab] = useState<TabType>('characters');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [battleActive, setBattleActive] = useState(false);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number[]>([0, 0, 0]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [battleMode, setBattleMode] = useState<BattleMode>('3v3');
  const [bossTeamSize, setBossTeamSize] = useState<number>(3);
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('cookierun-coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [ownedCharacters, setOwnedCharacters] = useState<string[]>(() => {
    const saved = localStorage.getItem('cookierun-owned');
    return saved ? JSON.parse(saved) : ['gingerbrave'];
  });
  const [team, setTeam] = useState<Character[]>(initialCharacters);
  const [enemies, setEnemies] = useState<Enemy[]>(getRandomEnemies());

  useEffect(() => {
    localStorage.setItem('cookierun-coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('cookierun-owned', JSON.stringify(ownedCharacters));
  }, [ownedCharacters]);

  const startBattle = () => {
    if (selectedTeam.length !== 3) {
      return;
    }
    const selectedChars = initialCharacters.filter(c => selectedTeam.includes(c.id));
    if (selectedChars.length !== 3) {
      return;
    }
    setTeam(JSON.parse(JSON.stringify(selectedChars)));
    const randomEnemies = getRandomEnemies();
    setEnemies(randomEnemies);
    setEnergy(selectedChars.map(() => 0));
    setBattleLog([`⚔️ Командная битва началась! Враги: ${randomEnemies.map(e => e.name).join(', ')}`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('battle');
  };

  const startDuel = () => {
    if (!selectedHero) {
      return;
    }
    const hero = initialCharacters.find(c => c.id === selectedHero);
    if (!hero) {
      return;
    }
    
    setTeam([JSON.parse(JSON.stringify(hero))]);
    const randomEnemy = getRandomEnemy();
    setEnemies([randomEnemy]);
    setEnergy([0]);
    setBattleLog([`⚔️ Дуэль началась! ${hero.name} против ${randomEnemy.name}!`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('duel');
  };

  const startBossBattle = () => {
    if (selectedTeam.length === 0) {
      return;
    }
    const selectedChars = initialCharacters.filter(c => selectedTeam.includes(c.id));
    if (selectedChars.length === 0) {
      return;
    }
    setTeam(JSON.parse(JSON.stringify(selectedChars)));
    const boss = getRandomBoss();
    setEnemies([boss]);
    setEnergy(selectedChars.map(() => 0));
    setBattleLog([`💀 БОЙ С БОССОМ! ${selectedChars.map(c => c.name).join(', ')} против ${boss.name}!`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('bossBattle');
  };

  const startExtremeBattle = () => {
    if (selectedTeam.length === 0) {
      return;
    }
    const selectedChars = initialCharacters.filter(c => selectedTeam.includes(c.id));
    if (selectedChars.length === 0) {
      return;
    }
    setTeam(JSON.parse(JSON.stringify(selectedChars)));
    setEnemies([JSON.parse(JSON.stringify(extremeBoss))]);
    setEnergy(selectedChars.map(() => 0));
    setBattleLog([`⚡ ЭКСТРИМ БОЙ! ${selectedChars.map(c => c.name).join(', ')} против легендарного ${extremeBoss.name}!`]);
    setCurrentTurn(0);
    setBattleActive(true);
    setSelectedCharIndex(null);
    setSelectedTarget(null);
    setCurrentView('extremeBattle');
  };

  const performAction = (useAbility: boolean) => {
    if (selectedCharIndex === null || selectedTarget === null || !battleActive) return;

    const newTeam = [...team];
    const newEnemies = [...enemies];
    const newEnergy = [...energy];
    const character = newTeam[selectedCharIndex];
    const target = newEnemies[selectedTarget];
    const newLog = [...battleLog];

    if (!character || !target) {
      return;
    }

    if (character.hp <= 0) {
      newLog.push(`${character.name} не может атаковать!`);
      setBattleLog(newLog);
      return;
    }

    if (useAbility) {
      const requiredEnergy = character.maxEnergy;
      if (newEnergy[selectedCharIndex] < requiredEnergy) {
        newLog.push(`⚡ ${character.name}: недостаточно энергии! Нужно: ${requiredEnergy}, есть: ${newEnergy[selectedCharIndex]}`);
        setBattleLog(newLog);
        return;
      }

      newEnergy[selectedCharIndex] = 0;
      performCharacterAbility(character, target, newTeam, newEnemies, newLog);
    } else {
      const damage = Math.max(1, Math.floor(character.attack * 0.8));
      target.hp = Math.max(0, target.hp - damage);
      newEnergy[selectedCharIndex] = Math.min(3, newEnergy[selectedCharIndex] + 1);
      newLog.push(`⚔️ ${character.name} атакует ${target.name}! Урон: ${damage} (+1 ⚡)`);
    }

    setTeam(newTeam);
    setEnemies(newEnemies);
    setEnergy(newEnergy);
    setBattleLog(newLog);
    setSelectedCharIndex(null);
    setSelectedTarget(null);

    const aliveEnemies = newEnemies.filter(e => e.hp > 0);
    if (aliveEnemies.length === 0) {
      const defeatedCount = newEnemies.length;
      const isBossBattle = currentView === 'bossBattle';
      const isExtremeBattle = currentView === 'extremeBattle';
      const earnedCoins = isExtremeBattle ? 100 : (isBossBattle ? 50 : defeatedCount * 20);
      setCoins(coins + earnedCoins);
      newLog.push(`🎉 ПОБЕДА! Все враги повержены!`);
      if (isExtremeBattle) {
        newLog.push(`⚡ ТИТАН НЕБЕС ПОВЕРЖЁН!`);
      } else if (isBossBattle) {
        newLog.push(`💀 БОСС ПОВЕРЖЁН!`);
      }
      newLog.push(`💰 Получено монет: ${earnedCoins}`);
      setBattleActive(false);
      setBattleLog(newLog);
      return;
    }

    setTimeout(() => {
      enemyTurn(newTeam, newEnemies, newLog);
    }, 1000);
  };

  const enemyTurn = (currentTeam: Character[], currentEnemies: Enemy[], currentLog: string[]) => {
    if (!battleActive) {
      return;
    }
    
    const aliveEnemies = currentEnemies.filter(e => e.hp > 0);
    if (aliveEnemies.length === 0) {
      return;
    }
    
    const newLog = performEnemyTurn(currentTeam, currentEnemies, currentLog);
    
    setTeam([...currentTeam]);
    setBattleLog(newLog);

    const stillAlive = currentTeam.filter(c => c.hp > 0);
    if (stillAlive.length === 0) {
      setBattleActive(false);
    }
  };

  const buyCharacter = (charId: string) => {
    if (ownedCharacters.includes(charId)) return;
    const price = charId === 'metal-knight' ? 200 : 100;
    if (coins < price) return;
    
    setCoins(coins - price);
    setOwnedCharacters([...ownedCharacters, charId]);
  };

  const handleToggleTeamCharacter = (charId: string) => {
    if (selectedTeam.includes(charId)) {
      setSelectedTeam(selectedTeam.filter(id => id !== charId));
    } else if (selectedTeam.length < 3) {
      setSelectedTeam([...selectedTeam, charId]);
    }
  };

  const handleSelectMode = (mode: BattleMode) => {
    setBattleMode(mode);
    setSelectedTeam([]);
    setSelectedHero(null);
    if (mode === '3v3') {
      setCurrentView('teamSelect');
    } else if (mode === '1v1') {
      setCurrentView('heroSelect');
    } else if (mode === 'boss') {
      setBossTeamSize(3);
      setCurrentView('bossTeamSelect');
    } else if (mode === 'extreme') {
      setBossTeamSize(3);
      setCurrentView('extremeTeamSelect');
    }
  };

  const handleToggleBossTeamCharacter = (charId: string) => {
    if (selectedTeam.includes(charId)) {
      setSelectedTeam(selectedTeam.filter(id => id !== charId));
    } else if (selectedTeam.length < bossTeamSize) {
      setSelectedTeam([...selectedTeam, charId]);
    }
  };

  const handleSetBossTeamSize = (size: number) => {
    setBossTeamSize(size);
    if (selectedTeam.length > size) {
      setSelectedTeam(selectedTeam.slice(0, size));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100 p-4">
      {currentView === 'menu' && (
        <div className="max-w-6xl mx-auto py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500 mb-4 drop-shadow-lg">
              Cookie Run Kingdom
            </h1>
            <p className="text-2xl text-amber-800 font-semibold">Командная стратегия 🍪</p>
            
            <div className="mt-4 inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 rounded-3xl border-4 border-yellow-600 game-shadow">
              <span className="text-4xl">💰</span>
              <div className="text-left">
                <p className="text-sm text-yellow-900 font-semibold">Ваши монеты</p>
                <p className="text-3xl font-bold text-white drop-shadow-lg">{coins}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setActiveTab('characters')}
              className={`h-16 px-8 text-xl font-bold rounded-2xl transition-all ${
                activeTab === 'characters'
                  ? 'bg-pink-500 text-white game-shadow scale-105'
                  : 'bg-white text-pink-500 border-3 border-pink-500'
              }`}
            >
              <Icon name="Users" className="mr-2" size={24} />
              Персонажи
            </Button>
            <Button
              onClick={() => setActiveTab('battle')}
              className={`h-16 px-8 text-xl font-bold rounded-2xl transition-all ${
                activeTab === 'battle'
                  ? 'bg-orange-500 text-white game-shadow scale-105'
                  : 'bg-white text-orange-500 border-3 border-orange-500'
              }`}
            >
              <Icon name="Swords" className="mr-2" size={24} />
              Бой
            </Button>
          </div>

          {activeTab === 'characters' && (
            <CharactersTab
              characters={initialCharacters}
              ownedCharacters={ownedCharacters}
              coins={coins}
              onBuyCharacter={buyCharacter}
            />
          )}

          {activeTab === 'battle' && (
            <BattleTab
              allEnemyTypes={allEnemyTypes}
              bossTypes={bossTypes}
              extremeBoss={extremeBoss}
              onSelectMode={handleSelectMode}
            />
          )}
        </div>
      )}

      {currentView === 'heroSelect' && (
        <HeroSelection
          characters={initialCharacters}
          ownedCharacters={ownedCharacters}
          selectedHero={selectedHero}
          onSelectHero={setSelectedHero}
          onStartDuel={startDuel}
          onBack={() => {
            setSelectedHero(null);
            setCurrentView('menu');
          }}
        />
      )}

      {currentView === 'teamSelect' && (
        <TeamSelection
          characters={initialCharacters}
          ownedCharacters={ownedCharacters}
          selectedTeam={selectedTeam}
          onToggleCharacter={handleToggleTeamCharacter}
          onStartBattle={startBattle}
          onBack={() => {
            setSelectedTeam([]);
            setCurrentView('menu');
          }}
        />
      )}

      {currentView === 'bossTeamSelect' && (
        <BossTeamSelection
          characters={initialCharacters}
          ownedCharacters={ownedCharacters}
          selectedTeam={selectedTeam}
          teamSize={bossTeamSize}
          onToggleCharacter={handleToggleBossTeamCharacter}
          onSetTeamSize={handleSetBossTeamSize}
          onStartBossBattle={startBossBattle}
          onBack={() => {
            setSelectedTeam([]);
            setCurrentView('menu');
          }}
        />
      )}

      {currentView === 'extremeTeamSelect' && (
        <BossTeamSelection
          characters={initialCharacters}
          ownedCharacters={ownedCharacters}
          selectedTeam={selectedTeam}
          teamSize={bossTeamSize}
          onToggleCharacter={handleToggleBossTeamCharacter}
          onSetTeamSize={handleSetBossTeamSize}
          onStartBossBattle={startExtremeBattle}
          onBack={() => {
            setSelectedTeam([]);
            setCurrentView('menu');
          }}
        />
      )}

      {(currentView === 'battle' || currentView === 'duel' || currentView === 'bossBattle' || currentView === 'extremeBattle') && (
        <BattleScene
          team={team}
          enemies={enemies}
          energy={energy}
          battleLog={battleLog}
          battleActive={battleActive}
          selectedCharIndex={selectedCharIndex}
          selectedTarget={selectedTarget}
          onSelectChar={setSelectedCharIndex}
          onSelectTarget={setSelectedTarget}
          onPerformAction={performAction}
          onStartBattle={startBattle}
          onExit={() => {
            setSelectedTeam([]);
            setSelectedHero(null);
            setBattleActive(false);
            setCurrentView('menu');
          }}
        />
      )}
    </div>
  );
};

export default Index;