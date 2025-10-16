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
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  emoji: string;
}

export type ViewType = 'menu' | 'characters' | 'teamSelect' | 'heroSelect' | 'battle' | 'duel' | 'bossTeamSelect' | 'bossBattle';
export type BattleMode = '3v3' | '1v1' | 'boss';
export type TabType = 'characters' | 'battle';