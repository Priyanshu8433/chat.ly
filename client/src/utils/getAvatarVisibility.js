export const shouldDisplayAvatar = (messages, currentMessage, i, loggedInUserId) => {
  if (currentMessage.sender._id === loggedInUserId) {
    return false;
  }

  if (i === messages.length - 1) {
    return true;
  }

  const nextMessage = messages[i + 1];
  if (nextMessage.sender._id !== currentMessage.sender._id) {
    return true;
  }

  return false;
};