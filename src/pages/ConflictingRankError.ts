export class ConflictingRankError extends Error {
  constructor(conflictingRankNumber: number, message?: string) {
    super(message ? message : `Rank ${conflictingRankNumber} already taken`);
  }
}
