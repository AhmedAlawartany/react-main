export enum RetryOptions {
  NO_RETRY = 0,
  ONCE = 1,
  TWICE = 2,
}

export enum StaleTime {
  SHORT = 5 * 60 * 1000,
  LONG = 30 * 60 * 1000,
}
