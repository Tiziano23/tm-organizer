import { getContext, hasContext, setContext } from "svelte";

export const stateClosure = <T>(initialValue: T) => {
  let state = $state(initialValue);
  return {
    get value() {
      return state;
    },
    set value(v: T) {
      state = v;
    },
  };
};

export const sharedState = <T, State>(
  key: string,
  closure: (v?: T) => State,
  initialValue: T
) => {
  if (!hasContext(key)) setContext(key, closure(initialValue));
  return getContext<State>(key);
};

export const useSharedState = <T>(key: string, initialValue: T) =>
  sharedState(key, stateClosure, initialValue);
