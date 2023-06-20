import React from "react";

interface DataItem {
id:number,
  avatar: string;
  name: string;
  email: string;
  image_path: string;
  action: string;
}

const StudentRecord: React.FC<{ data: DataItem[],handleClick:(id:number)=>void }> = (props) => {
  const { data } = props;



  return (
    <div className="grid grid-cols-5 border">
      <div className="font-bold border p-2">Avatar</div>
      <div className="font-bold border p-2">Name</div>
      <div className="font-bold border p-2">Email</div>
      <div className="font-bold border p-2">image</div>
      <div className="font-bold border p-2">Action</div>

      {(data || [])?.map((item, index) => (
        <React.Fragment key={index}>
          <div className="border p-2">{item.avatar}</div>
          <div className="border p-2">{item.name}</div>
          <div className="border p-2">{item.email}</div>
          <div className="border">
                <img src={item.image_path} className="h-24 w-24"alt={item.name}/>

          </div>
          <div className="border p-2"><button onClick={()=>props.handleClick(item.id)}>delete</button></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StudentRecord;
