import { Character, Enemy } from '@/types/game';

export const performCharacterAbility = (
  character: Character,
  target: Enemy,
  newTeam: Character[],
  newEnemies: Enemy[],
  newLog: string[]
): void => {
  if (character.id === 'gingerbrave') {
    const damage = Math.floor(character.attack * 1.5);
    target.hp = Math.max(0, target.hp - damage);
    const heal = Math.floor(character.maxHp * 0.15);
    character.hp = Math.min(character.maxHp, character.hp + heal);
    newLog.push(`💥 ${character.name} использует ${character.ability}! Урон: ${damage}, HP+${heal}`);
  } else if (character.id === 'shadow-milk') {
    const damage = Math.floor(character.attack * 2.0);
    target.hp = Math.max(0, target.hp - damage);
    newLog.push(`🌟 ${character.name} использует ${character.ability}! Критический урон: ${damage}!`);
  } else if (character.id === 'strawberry') {
    const heal = Math.floor(character.maxHp * 0.4);
    newTeam.forEach(char => {
      if (char.hp > 0) {
        char.hp = Math.min(char.maxHp, char.hp + heal);
      }
    });
    newLog.push(`💚 ${character.name} использует ${character.ability}! Команда восстановила ${heal} HP!`);
  } else if (character.id === 'red-velvet') {
    const damage = Math.floor(character.attack * 2.0);
    const actualDamage = Math.min(damage, target.hp);
    target.hp = Math.max(0, target.hp - damage);
    const vampHeal = Math.floor(actualDamage * 0.5);
    character.hp = Math.min(character.maxHp, character.hp + vampHeal);
    newLog.push(`🩸 ${character.name} использует ${character.ability}! Урон: ${damage}, вампиризм: ${vampHeal} HP!`);
  } else if (character.id === 'metal-knight') {
    const damage = Math.floor(character.attack * 2.5);
    target.hp = Math.max(0, target.hp - damage);
    newLog.push(`⚔️ ${character.name} использует ${character.ability}! Мощный удар: ${damage}!`);
  } else if (character.id === 'wizard') {
    const damage = Math.floor(character.attack * 1.5);
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        enemy.hp = Math.max(0, enemy.hp - damage);
      }
    });
    newLog.push(`✨ ${character.name} использует ${character.ability}! AoE урон: ${damage} всем врагам!`);
  } else if (character.id === 'wind-archer') {
    const damage = Math.floor(character.attack * 2.4);
    target.hp = Math.max(0, target.hp - damage);
    newLog.push(`🏹 ${character.name} использует ${character.ability}! КРИТИЧЕСКИЙ урон: ${damage}!`);
  } else if (character.id === 'sea-fairy') {
    const damage = Math.floor(character.attack * 1.2);
    let enemiesHit = 0;
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        enemy.hp = Math.max(0, enemy.hp - damage);
        enemiesHit++;
      }
    });
    newLog.push(`🌊 ${character.name} использует ${character.ability}! Урон ${damage} всем врагам (${enemiesHit} целей)!`);
  } else if (character.id === 'werewolf') {
    const damage = Math.floor(character.attack * 1.2);
    let totalDamageDealt = 0;
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        const actualDamage = Math.min(damage, enemy.hp);
        enemy.hp = Math.max(0, enemy.hp - damage);
        totalDamageDealt += actualDamage;
      }
    });
    const healAmount = Math.floor(totalDamageDealt * 0.5);
    newTeam.forEach(char => {
      if (char.hp > 0) {
        char.hp = Math.min(char.maxHp, char.hp + healAmount);
      }
    });
    newLog.push(`🐺 ${character.name} использует ${character.ability}! Урон: ${damage} всем врагам, команда восстановила ${healAmount} HP!`);
  } else if (character.id === 'pale-lily') {
    const heal = 200;
    newTeam.forEach(char => {
      if (char.hp > 0) {
        char.hp = Math.min(char.maxHp, char.hp + heal);
      }
    });
    newLog.push(`🌸 ${character.name} использует ${character.ability}! Команда восстановила ${heal} HP!`);
  } else if (character.id === 'pale-garden-guard') {
    const damage = Math.floor(character.attack * 1.3);
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        enemy.hp = Math.max(0, enemy.hp - damage);
      }
    });
    const heal = 100;
    character.hp = Math.min(character.maxHp, character.hp + heal);
    newLog.push(`🛡️ ${character.name} использует ${character.ability}! Урон ${damage} всем врагам, восстановлено ${heal} HP!`);
  }
};

export const performEnemyTurn = (
  currentTeam: Character[],
  currentEnemies: Enemy[],
  currentLog: string[]
): string[] => {
  const newLog = [...currentLog];
  const aliveEnemies = currentEnemies.filter(e => e.hp > 0);
  const aliveHeroes = currentTeam.filter(c => c.hp > 0);

  if (aliveHeroes.length === 0) {
    newLog.push('💀 ПОРАЖЕНИЕ! Вся команда пала в бою...');
    return newLog;
  }

  aliveEnemies.forEach(enemy => {
    if (aliveHeroes.length === 0) return;
    const targetIndex = Math.floor(Math.random() * aliveHeroes.length);
    const target = aliveHeroes[targetIndex];
    if (!target) return;
    const damage = Math.max(1, enemy.attack - Math.floor(target.defense * 0.3));
    target.hp = Math.max(0, target.hp - damage);
    newLog.push(`${enemy.emoji} ${enemy.name} атакует ${target.name}! Урон: ${damage}`);
    
    if (target.hp === 0) {
      const heroIndex = aliveHeroes.indexOf(target);
      if (heroIndex !== -1) {
        aliveHeroes.splice(heroIndex, 1);
      }
    }
  });

  return newLog;
};