export default function HomePage() {
  return (
    <main className="px-16 py-24 font-extrabold text-xl text-white">
      <section className="flex gap-5 ">
        <div className=" h-48 w-48 bg-primary rounded-md">
          {/* <span>
            <img
              src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP5835DTsb0lMiEfABjuLGdcxv8qz6o_tjYxzU6KLKJCulTYEQW8oZeTmvj9P7WHMe9Qk&usqp=CAU"
              alt=""
              height=""
              width=""
            ></img>
          </span> */}

          <p className="px-2 pb-4">Start Taking Attendance </p>
        </div>
        <div className="h-48 w-48 bg-primary rounded-md">
          <p className="px-2 pb-4">View Reports</p>
        </div>
        <div className="h-48 w-48 bg-primary rounded-md">
          <p className="px-2 pb-4">Manage Students</p>
        </div>
      </section>
    </main>
  );
}
