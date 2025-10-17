export interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  ability: string;
  abilityDesc: string;
  gradient: string;
  emoji: string;
  energy: number;
  maxEnergy: number;
  regenTurns?: number;
  regenAmount?: number;
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  emoji: string;
}

export type ViewType = 'menu' | 'characters' | 'teamSelect' | 'heroSelect' | 'battle' | 'duel' | 'bossTeamSelect' | 'bossBattle' | 'extremeTeamSelect' | 'extremeBattle' | 'paleGardenSelect' | 'paleGarden' | 'chessTeamSelect' | 'chessBattle';
export type BattleMode = '3v3' | '1v1' | 'boss' | 'extreme' | 'pale-garden' | 'chess';
export type TabType = 'characters' | 'battle' | 'chess';