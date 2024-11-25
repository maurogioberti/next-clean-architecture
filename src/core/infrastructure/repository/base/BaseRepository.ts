export abstract class BaseRepository {
  private static readonly repositoryImplementationPattern = "Impl";

  static getInterface(): string {
    return this.name.replace(this.repositoryImplementationPattern, "");
  }
}