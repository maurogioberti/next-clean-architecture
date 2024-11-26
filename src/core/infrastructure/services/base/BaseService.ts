export abstract class BaseService {
  private static readonly serviceImplementationPattern = "Impl";

  static getInterface(): string {
    return this.name.replace(this.serviceImplementationPattern, "");
  }
}