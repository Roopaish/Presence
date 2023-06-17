import React from "react";

type TestType = {
  label: string;
  id: string;
  className: string;
};

export default function Test({ label, ...rest }: TestType) {
  return (
    <div id={rest.id} className={rest.className}>
      Test
    </div>
  );

  // return (
  //   <div {...rest}>
  //     Test
  //   </div>
  // );
}
