/**
 * Small impure helpers kept out of component bodies so the React Compiler
 * ESLint rules can reason about purity inside components.
 */
export function timestamp() {
  return Date.now();
}

export function elapsedMsSince(start: number) {
  return Date.now() - start;
}
