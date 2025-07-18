const isSameSender = (messages, mess, i, userId) => {
  return (i < messages.length-1 &&
    (messages[i + 1].sender._id !== mess.sender._id ||
      messages[i + 1].sender._id == undefined) &&
    messages[i].sender._id !== userId);
};

export default isSameSender;