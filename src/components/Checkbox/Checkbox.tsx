import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const changeParentLiValue = (e) => {
    e.target.parentElement.setAttribute('value', (!checked).toString());
  }

  return (
      <img onClick={(e) => {
        setChecked(!checked);
        changeParentLiValue(e)
      }}
        src={checked ? "/icons/checkBoxChecked.svg" : "/icons/checkBoxOutline.svg"}
      />
  );
};

export default Checkbox;
