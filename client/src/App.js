import Home from "./Components/Home";
import Details from "./Components/CoinDetails/Graph";
import Buy from "./Components/Market";
import "./App.css";
import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginModal from "./Components/LoginModal";
import Dashboard from "./Components/UserInformation/Dashboard";
import Nav from "./Components/Nav";
import Signup from "./Components/Signup";
import UpdateInfo from "./Components/UserInformation/UpdateInfo";
import ProtectedBuyTransaction from "./Components/Protected/ProtectedBuyTransaction";
import ProtectedSellTransaction from "./Components/Protected/ProtectedSellTransaction"

function App() {
  const [open, setOpen] = useState(false);

  const [opensign, setOpensign] = useState(false);

  return (
    <Router>
      {open && <LoginModal closemod={[setOpen, setOpensign]} />}
      {opensign && <Signup closemod={[setOpen, setOpensign]} />}

      <div>
        <Nav open={[setOpen, setOpensign]} />
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/transaction"
            element={<ProtectedBuyTransaction open={[setOpen, setOpensign]} />}
          />
          <Route
            exact
            path="/transactionSell"
            element={<ProtectedSellTransaction open={[setOpen, setOpensign]} />}
          />
          <Route exact path="/coin" element={<Details open={[setOpen, setOpensign]}/>} />
          <Route exact path="/market" element={<Buy />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profileUpdate" element={<UpdateInfo />} />

          {/* <Route exact path="/createUser" element={<LoginModal/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
