import Button from "@/components/Button";
import React from "react";

export default function Presencepage() {
  return (
    <main className="px-5 py-8">
      <section className="flex gap-10">
        <div className=" flex-1 h-96 w-96 bg-slate-700"></div>
        <div className="">
          <h3 className="text-2xl font-extrabold">Submit your images</h3>
          <p className="mt-5 mb-5 text-lg font-normal">
            Please show different emotions and different side of your faces in
            every 1s of interval.
          </p>
          <span>
            <img
              src="images/emotion.gif"
              alt=""
              height="245px"
              width="245px"
            ></img>
          </span>
          <div className="mt-4 w-64">
            <Button type="submit">Capture Images</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
