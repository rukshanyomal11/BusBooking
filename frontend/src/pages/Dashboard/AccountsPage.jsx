import React from "react";
import Sidebar from "../../components/user/Sidebar";
import AccountEdit from "../../components/user/AccountEdit";
import AccountDetails from "../../components/user/AccountDetails";

const AccountsPage = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />

      <main className="flex-1 p-8">


        <div >
         <AccountDetails />
       </div>
       
      </main>
      
    </div>
  );
};

export default AccountsPage;
