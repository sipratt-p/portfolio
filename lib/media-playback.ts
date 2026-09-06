export function pauseOtherMedia<T extends { pause: () => void }>(active:T|null, media:Iterable<T>) {
  for (const item of media) if (item !== active) item.pause();
}
