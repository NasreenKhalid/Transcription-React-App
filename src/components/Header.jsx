import React from "react";

const Header = () => {
  return (
    <div>
      <header className="p-4 flex items-center justify-between gap-4">
       <a href="/"></a> <h1 className="font-medium">
          Trans<span className="text-blue-400">late</span>
        </h1>
        <a href="/"
          className="specialBtn flex items-center gap-2
px-4 py-2 rounded-lg text-blue-400">
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </a>
      </header>
    </div>
  );
};

export default Header;
