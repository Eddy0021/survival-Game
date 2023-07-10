let intervalIds = {};

function interval(method, milliseconds, identifier) {
    if (identifier in intervalIds) {
        // The identifier already exists in intervalIds
        // You can choose to handle this case as per your requirements
        console.log(`Interval with identifier '${identifier}' already exists`);
        return;
    }
    const intervalId = setInterval(method, milliseconds);
    intervalIds[identifier] = intervalId;
    //console.log(intervalIds);
}

function clearIntervaL(identifier) {
  if (identifier in intervalIds) {
    const intervalId = intervalIds[identifier];
    if (intervalId) {
      clearInterval(intervalId);
      delete intervalIds[identifier];
    }
  }
  //console.log(intervalIds);
}

function clearAllIntervals() {
    for (const identifier in intervalIds) {
        let intervalId = intervalIds[identifier];
        clearInterval(intervalId);
    }
    intervalIds = {};
    //console.log(intervalIds);
}

export { interval, clearIntervaL, clearAllIntervals };
