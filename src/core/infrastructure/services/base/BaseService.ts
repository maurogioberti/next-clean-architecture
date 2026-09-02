export abstract class BaseService {
  private static readonly serviceImplementationPattern = "Impl";

  static getInterface(): string {
    return this.name.replace(this.serviceImplementationPattern, "");
  }

  /**
   * Loads a JSON document from `src/data` by name.
   *
   * The `.json` suffix lives inside the template literal on purpose: it narrows
   * the bundler dynamic-import context to JSON files, so nothing else that ends
   * up in `src/data` (HTML, Markdown, images) is pulled into the module graph.
   */
  protected async fetchData<T>(fileName: string): Promise<T> {
    const data = await import(`@/data/${fileName}.json`);
    return data.default as T;
  }
}
