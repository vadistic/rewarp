export class CustomError extends Error {
  constructor(msg: string, ...inputs: unknown[]) {
    super(msg + '\n' + CustomError.serialise(inputs))
  }

  private static serialise(inputs: unknown[]) {
    return inputs
      .map(input => {
        if (typeof input === 'object' || typeof input === 'function') {
          return JSON.stringify(input, null, 2)
        }

        return input
      })
      .join('\n')
  }
}
