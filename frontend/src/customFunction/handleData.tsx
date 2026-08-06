export function handleDate(date: string) {
  const createdTime = new Date(date).getTime();
  const currentTime = Date.now();

  const diff = Math.floor((currentTime - createdTime) / 1000); // seconds

  if (diff < 60) {
    return `${diff}sec ago`;
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}min ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  }

  if (diff < 604800) {
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return new Date(date).toLocaleDateString();
};