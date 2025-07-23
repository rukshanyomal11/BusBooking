import React from "react";
import Sidebar from "../../components/user/Sidebar";
import ResponseTable from "../../components/user/ResponseTable";

const ResponsePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-blue-50 min-h-screen p-6">
        <div className="text-center text-xl font-semibold text-gray-800 mb-6">
        
        </div>
        
        <div className="m-8">
            <ResponseTable />
        </div> 
      </div> 
    </div>
  );
};

export default ResponsePage;
