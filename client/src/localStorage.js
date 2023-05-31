export const getDatafromLS = () => {
    if (!localStorage["newEvent"]) {
      localStorage["newEvent"] = "[]";
    }
  
    let newEvent = localStorage["newEvent"];
    newEvent = JSON.parse(newEvent);
    return newEvent;
  };

  
  //Localstorage SetItem
  export const addEvent = (employee) => {
    const newEvent = getDatafromLS();
    newEvent.push(employee);
    localStorage["newEvent"] = JSON.stringify(newEvent);
  };