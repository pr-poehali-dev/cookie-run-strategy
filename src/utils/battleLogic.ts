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
    const heal = 300;
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
  } else if (character.id === 'herb') {
    const hasActiveRegen = newTeam.some(char => char.regenTurns && char.regenTurns > 0);
    if (hasActiveRegen) {
      newLog.push(`🌿 ${character.name} не может использовать способность - регенерация уже активна!`);
      return;
    }
    newTeam.forEach(char => {
      char.regenTurns = 3;
      char.regenAmount = 160;
    });
    newLog.push(`🌿 ${character.name} использует ${character.ability}! Регенерация активирована на 3 хода (+160 HP/ход)!`);
  } else if (character.id === 'choco-chess') {
    const damage = Math.floor(character.attack * 2.0);
    target.hp = Math.max(0, target.hp - damage);
    newLog.push(`♟️ ${character.name} использует ${character.ability}! Урон: ${damage}!`);
  } else if (character.id === 'concierge') {
    const damage = Math.floor(character.attack * 2.0);
    let enemiesHit = 0;
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        enemy.hp = Math.max(0, enemy.hp - damage);
        enemiesHit++;
      }
    });
    const selfDamage = enemiesHit * 20;
    character.hp = Math.max(0, character.hp - selfDamage);
    newLog.push(`🔔 ${character.name} использует ${character.ability}! Урон ${damage} всем врагам (${enemiesHit} целей), потеряно ${selfDamage} HP!`);
  } else if (character.id === 'eternal-sugar') {
    newEnemies.forEach(enemy => {
      if (enemy.hp > 0) {
        enemy.poisonTurns = 3;
        enemy.poisonDamage = 80;
      }
    });
    newLog.push(`🍬 ${character.name} использует ${character.ability}! Все враги отравлены на 3 хода (80 урона/ход)!`);
  } else if (character.id === 'sugarfly') {
    const hasActiveHeal = newTeam.some(char => char.healTurns && char.healTurns > 0);
    if (hasActiveHeal) {
      newLog.push(`🦋 ${character.name} не может использовать способность - исцеление уже активно!`);
      return;
    }
    newTeam.forEach(char => {
      char.healTurns = 5;
      char.healAmount = 120;
    });
    newLog.push(`🦋 ${character.name} использует ${character.ability}! Исцеление активировано на 5 ходов (+120 HP/ход)!`);
  }
};

export const applyRegeneration = (team: Character[], log: string[]): void => {
  team.forEach(char => {
    if (char.regenTurns && char.regenTurns > 0 && char.hp > 0) {
      const healAmount = char.regenAmount || 0;
      char.hp = Math.min(char.maxHp, char.hp + healAmount);
      char.regenTurns -= 1;
      if (char.regenTurns === 0) {
        char.regenAmount = 0;
      }
    }
  });
  const activeRegen = team.some(char => char.regenTurns && char.regenTurns > 0);
  if (activeRegen) {
    const turnsLeft = team.find(char => char.regenTurns && char.regenTurns > 0)?.regenTurns || 0;
    log.push(`🌿 Регенерация: команда восстановила 160 HP! Осталось ходов: ${turnsLeft}`);
  }
};

export const applyHealing = (team: Character[], log: string[]): void => {
  team.forEach(char => {
    if (char.healTurns && char.healTurns > 0 && char.hp > 0) {
      const healAmount = char.healAmount || 0;
      char.hp = Math.min(char.maxHp, char.hp + healAmount);
      char.healTurns -= 1;
      if (char.healTurns === 0) {
        char.healAmount = 0;
      }
    }
  });
  const activeHeal = team.some(char => char.healTurns && char.healTurns > 0);
  if (activeHeal) {
    const turnsLeft = team.find(char => char.healTurns && char.healTurns > 0)?.healTurns || 0;
    log.push(`🦋 Исцеление: команда восстановила 120 HP! Осталось ходов: ${turnsLeft}`);
  }
};

export const applyPoison = (enemies: Enemy[], log: string[]): void => {
  enemies.forEach(enemy => {
    if (enemy.poisonTurns && enemy.poisonTurns > 0 && enemy.hp > 0) {
      const damage = enemy.poisonDamage || 0;
      enemy.hp = Math.max(0, enemy.hp - damage);
      enemy.poisonTurns -= 1;
      if (enemy.poisonTurns === 0) {
        enemy.poisonDamage = 0;
      }
    }
  });
  const activePoison = enemies.some(enemy => enemy.poisonTurns && enemy.poisonTurns > 0);
  if (activePoison) {
    const turnsLeft = enemies.find(enemy => enemy.poisonTurns && enemy.poisonTurns > 0)?.poisonTurns || 0;
    log.push(`☠️ Яд: враги получили 80 урона! Осталось ходов: ${turnsLeft}`);
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