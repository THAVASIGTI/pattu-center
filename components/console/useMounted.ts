import { useSyncExternalStore } from "react";

/**
 * False while the markup is being prerendered and during the first
 * hydration render, true afterwards.
 *
 * The console has to ask "has this reached a browser yet?" in two places,
 * because the session lives in a cookie and a static export has no idea who
 * is signed in at build time. The usual way to answer it is a useState set
 * from an empty useEffect, which React now warns about: it is a cascading
 * render, a second pass triggered by the first for no reason React can see.
 *
 * useSyncExternalStore answers the same question without the extra state.
 * The server snapshot is false, the client snapshot is true, and the store
 * never changes, so subscribe has nothing to do.
 */
const noop = () => () => {};
const onClient = () => true;
const onServer = () => false;

export function useMounted() {
  return useSyncExternalStore(noop, onClient, onServer);
}
