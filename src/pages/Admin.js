import React from "react";
import Login from "../components/Admin/Login";
import Orders from "../components/Admin/Orders";
import { GlobalContext } from "../context/GlobalContext";
export default class Admin extends React.Component {
  static contextType = GlobalContext;
  render() {
    return (
      <main>
        {localStorage.getItem("email") === null ? <Login /> : <Orders />}
      </main>
    );
  }
}
