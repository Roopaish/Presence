import Button from "@/components/Button";
import React from "react";

export default function SubmitImages() {
  return (
    <main className="px-5 py-8">
      <section className="flex gap-10 md:flex-row flex-col-reverse">
        <div className="flex-1 min-h-[384px] w-96 bg-slate-700"></div>
        <div className="flex-1">
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
