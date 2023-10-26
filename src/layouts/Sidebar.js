import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      <CDBSidebar
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        style={{ width: 250, height: "80vh" }}
      >
        <CDBSidebarHeader>My Sidebar</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem active icon="">
              Home
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>

      <button onClick={() => setShowSidebar(true)}>Toggle Sidebar</button>
    </div>
  );
}

export default Sidebar;
